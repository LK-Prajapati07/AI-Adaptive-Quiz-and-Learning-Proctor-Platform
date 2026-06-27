import { getNextQuestion } from "../utils/getNextQuestion.js";
import { updateDifficulty } from "../utils/difficulty.algorithm.js";
import { evaluateAnswer } from "../utils/evaluator.js";
import redisClient from "../config/redis.config.js";
import { Question } from "../model/question.model.js";
import { Attempt } from "../model/attempt.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { Proctor } from "../model/proctor.model.js";
const QUESTION_PER_DIFFICULTY = 10;
const REDIS_EXPIRE_TIME = 60 * 60;

export const startQuizAttempt = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Quiz ID",
      });
    }
    const runningAttempt = await Attempt.findOne({
      user: userId,
      quiz: quizId,
      status: "RUNNING",
    });

    // if (runningAttempt) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You already have a running quiz.",
    //   });
    // }

    if (runningAttempt) {
      const redisKey = `quiz:${runningAttempt._id}`;

      const sessionData = await redisClient.get(redisKey);

      if (sessionData) {
        const session = JSON.parse(sessionData);

        return res.status(200).json({
          success: true,
          resume: true,
          message: "Resume your quiz.",
          attemptId: runningAttempt._id,
          question: session.currentQuestion,
        });
      }

      // Redis session expired.
      // Mark old attempt as expired and create a fresh one.

      await Attempt.findByIdAndUpdate(runningAttempt._id, {
        status: "EXPIRED",
        completedAt: new Date(),
      });

      await Proctor.deleteOne({
        attempt: runningAttempt._id,
      });

      console.log("Old quiz session expired. Creating new attempt...");
    }
    const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all([
      Question.aggregate([
        {
          $match: {
            quizId: new mongoose.Types.ObjectId(quizId),
            difficulty: "Easy",
          },
        },
        {
          $sample: {
            size: QUESTION_PER_DIFFICULTY,
          },
        },
      ]),

      Question.aggregate([
        {
          $match: {
            quizId: new mongoose.Types.ObjectId(quizId),
            difficulty: "Medium",
          },
        },
        {
          $sample: {
            size: QUESTION_PER_DIFFICULTY,
          },
        },
      ]),

      Question.aggregate([
        {
          $match: {
            quizId: new mongoose.Types.ObjectId(quizId),
            difficulty: "Hard",
          },
        },
        {
          $sample: {
            size: QUESTION_PER_DIFFICULTY,
          },
        },
      ]),
    ]);

    console.log("Easy:", easyQuestions.length);
    console.log("Medium:", mediumQuestions.length);
    console.log("Hard:", hardQuestions.length);

    if (
      easyQuestions.length === 0 ||
      mediumQuestions.length === 0 ||
      hardQuestions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Not enough questions available.",
      });
    }
    let studentImageUrl = "";

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);

      studentImageUrl = upload.secure_url;
    } else if (req.body.studentImageUrl) {
      studentImageUrl = req.body.studentImageUrl;
    } else {
      return res.status(400).json({
        success: false,
        message: "Student photo is required.",
      });
    }
    const attempt = await Attempt.create({
      user: userId,
      quiz: quizId,
      studentImageUrl,
      questions: [],
      totalScore: 0,
      maxScore: 0,
      percentage: 0,
      status: "RUNNING",
      startedAt: new Date(),
    });
    await Proctor.create({
      attempt: attempt._id,
      user: userId,
      quiz: quizId,
      riskScore: 0,
      status: "NORMAL",
      warnings: [],
      detectedObjects: [],
      faceCount: 1,
    });
    const session = {
      attemptId: attempt._id.toString(),
      quizId,
      userId,
      Easy: easyQuestions,
      Medium: mediumQuestions,
      Hard: hardQuestions,
      currentDifficulty: "Medium",
      currentQuestion: mediumQuestions[0],
      attempted: [],
      answers: [],
      score: 0,
      maxScore: 0,
      totalAttempt: 0,
      totalQuestions:
        easyQuestions.length + mediumQuestions.length + hardQuestions.length,
    };
    const redisKey = `quiz:${attempt._id}`;
    await redisClient.set(redisKey, JSON.stringify(session), {
      EX: REDIS_EXPIRE_TIME,
    });
    return res.status(200).json({
      success: true,
      message: "Quiz started successfully.",
      attemptId: attempt._id,
      question: session.currentQuestion,
    });
  } catch (error) {
    console.error("Start Quiz Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { questionId, answer } = req.body;

    // -------------------------------------
    // Validate Request
    // -------------------------------------

    if (!questionId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question ID and answer are required.",
      });
    }

    // -------------------------------------
    // Get Quiz Session
    // -------------------------------------

    const redisKey = `quiz:${attemptId}`;

    const sessionData = await redisClient.get(redisKey);

    if (!sessionData) {
      return res.status(404).json({
        success: false,
        message: "Quiz session expired.",
      });
    }

    const session = JSON.parse(sessionData);

    // -------------------------------------
    // Prevent Duplicate Submission
    // -------------------------------------

    if (session.attempted.includes(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Question already answered.",
      });
    }
    const allQuestions = [...session.Easy, ...session.Medium, ...session.Hard];
    const currentQuestion = allQuestions.find(
      (question) => question._id.toString() === questionId,
    );
    if (!currentQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }
    const evaluation = await evaluateAnswer(currentQuestion, answer);
    session.answers.push({
      question: questionId,
      userAnswer: answer,
      score: evaluation.score,
      maxScore: evaluation.maxScore,
      evaluationMethod: evaluation.evaluationMethod || evaluation.method,
      feedback: evaluation.feedback || "",
      difficulty: currentQuestion.difficulty,
    });
    session.attempted.push(questionId);
    session.score += evaluation.score;
    session.maxScore += evaluation.maxScore;
    session.totalAttempt++;
    updateDifficulty(session, evaluation);
    if (session.totalAttempt >= session.totalQuestions) {
      const percentage =
        session.maxScore === 0
          ? 0
          : Number(((session.score / session.maxScore) * 100).toFixed(2));

      await Attempt.findByIdAndUpdate(session.attemptId, {
        questions: session.answers,

        totalScore: session.score,

        maxScore: session.maxScore,

        percentage,

        status: "COMPLETED",

        completedAt: new Date(),
      });

      await redisClient.del(redisKey);

      return res.status(200).json({
        success: true,

        completed: true,

        message: "Quiz completed successfully.",

        attemptId: session.attemptId,

        totalScore: session.score,

        maxScore: session.maxScore,

        percentage,

        answers: session.answers,
      });
    }

    // -------------------------------------
    // Next Question
    // -------------------------------------

    const nextQuestion = getNextQuestion(session);

    if (!nextQuestion) {
      return res.status(500).json({
        success: false,
        message: "Unable to fetch next question.",
      });
    }

    session.currentQuestion = nextQuestion;
    await redisClient.set(redisKey, JSON.stringify(session), {
      EX: REDIS_EXPIRE_TIME,
    });
    return res.status(200).json({
      success: true,

      completed: false,

      evaluation,

      nextQuestion,

      currentDifficulty: session.currentDifficulty,

      questionNumber: session.totalAttempt + 1,

      remainingQuestions: session.totalQuestions - session.totalAttempt,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getAttemptResult = async (req, res) => {
  try {
    const userId = req.user.id;
    const { attemptId } = req.params;

    // ----------------------------
    // Validate ObjectId
    // ----------------------------

    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attempt ID",
      });
    }

    // ----------------------------
    // Find Attempt
    // ----------------------------

    const attempt = await Attempt.findById(attemptId)
      .populate(
        "quiz",
        "title description category difficulty duration passingMarks totalMarks",
      )
      .populate(
        "questions.question",
        "question questionType options correctAnswer explanation difficulty marks",
      );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    // ----------------------------
    // Security Check
    // ----------------------------

    if (attempt.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // ----------------------------
    // Response
    // ----------------------------

    return res.status(200).json({
      success: true,
      message: "Attempt fetched successfully",
      attempt,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserAttempts = async (req, res) => {
  try {
    const userId = req.user.id;

    // --------------------------------
    // Fetch User Attempts
    // --------------------------------

    const attempts = await Attempt.find({
      user: userId,
    })
      .populate(
        "quiz",
        "title description category difficulty duration totalMarks passingMarks",
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    // --------------------------------
    // Response
    // --------------------------------

    return res.status(200).json({
      success: true,

      message: "Attempts fetched successfully",

      total: attempts.length,

      attempts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
