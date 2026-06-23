import { getNextQuestion } from "../utils/getNextQuestion.js";
import { updateDifficulty } from "../utils/difficulty.algorithm.js";
import { evaluateAnswer } from "../utils/evaluator.js";
import redisClient from "../config/redis.config.js";
import { Question } from "../model/question.model.js";
import { Attempt } from "../model/attempt.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { Proctor } from "../model/proctor.model.js";



export const startQuizAttempt = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId } = req.params;
    const Easy = await Question.aggregate([
      {
        $match: {
          quizId: new mongoose.Types.ObjectId(quizId),
          difficulty: "Easy",
        },
      },

      {
        $sample: {
          size: 10,
        },
      },
    ]);
    const Medium = await Question.aggregate([
      {
        $match: {
          quizId: new mongoose.Types.ObjectId(quizId),
          difficulty: "Medium",
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);
    const Hard = await Question.aggregate([
      {
        $match: {
          quizId: new mongoose.Types.ObjectId(quizId),
          difficulty: "Hard",
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);
    if (Easy.length === 0 || Medium.length === 0 || Hard.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Not enough questions",
      });
    }
    let studentImageUrl;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      studentImageUrl = uploadResult.secure_url;
    } else if (req.body.studentImageUrl) {
      studentImageUrl = req.body.studentImageUrl;
    } else {
      return res.status(400).json({
        success: false,
        message: "Student photo required",
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
      attemptId: attempt._id,
      quizId,
      userId,
      Easy,
      Medium,
      Hard,
      currentDifficulty: "Medium",
      attempted: [Medium[0]._id],
      answers: [],
      score: 0,
      maxScore: 0,
      totalAttempt: 0,
    };
    const redisKey = `quiz:${attempt._id}`;
    await redisClient.set(
      redisKey,
      JSON.stringify(session),
      {
        EX: 3600,
      },
    );
   return res.status(200).json({
     success: true,
      message: "Quiz Started",
      attemptId: attempt._id,
      question: Medium[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { attemptId } = req.params;
    const { questionId, answer } = req.body;
    const redisKey = `quiz:${attemptId}`;
    let session = JSON.parse(await redisClient.get(redisKey));
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Quiz expired",
      });
    }
    const allQuestions = [...session.Easy, ...session.Medium, ...session.Hard];
    const question = allQuestions.find((q) => q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    // Evaluate answer
    const evaluation = await evaluateAnswer(question, answer);
    session.attempted.push(questionId);
    session.answers.push({
      question: questionId,
      userAnswer: answer,
      score: evaluation.score,
      maxScore: evaluation.maxScore,
      evaluationMethod: evaluation.evaluationMethod || evaluation.method,
      feedback: evaluation.feedback || "",
      difficulty: question.difficulty,
    });
    session.score += evaluation.score;
    session.maxScore += evaluation.maxScore;
    session.totalAttempt++;
    updateDifficulty(session, evaluation);
    // Quiz finished
    if (session.totalAttempt === 10) {
      const percentage = (session.score / session.maxScore) * 100;
      // FIRST save Redis data into MongoDB
      await Attempt.findByIdAndUpdate(session.attemptId, {
        questions: session.answers,
        totalScore: session.score,
        maxScore: session.maxScore,
        percentage,
        status: "COMPLETED",
        completedAt: new Date(),
      });
      // AFTER SAVE remove redis
      await redisClient.del(redisKey);
      return res.status(200).json({
        success: true,
        message: "Quiz Completed",
        attemptId: session.attemptId,
        score: session.score,
        maxScore: session.maxScore,
        percentage,
        answers: session.answers,
      });
    }
    const nextQuestion = getNextQuestion(session);
    await redisClient.set(redisKey, JSON.stringify(session), {
      EX: 3600,
    });
    return res.status(200).json({
      success: true,
      evaluation,
      nextQuestion,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAttemptResult = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId)
      .populate("quiz", "title category difficulty")
      .populate(
        "questions.question",
        "question options correctAnswer explanation",
      );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    return res.status(200).json({
      success: true,

      attempt,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getUserAttempts = async (req, res) => {
  try {
    const userId = req.user.id;

    const attempts = await Attempt.find({
      user: userId,
    })
      .populate("quiz", "title category difficulty")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      total: attempts.length,

      attempts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
