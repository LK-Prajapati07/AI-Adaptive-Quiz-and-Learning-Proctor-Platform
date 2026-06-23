import { Quiz } from "../model/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      totalQuestions,
      questionType,
      duration,
      passingMarks,
      totalMarks,
      isRandomized,
      isAdaptive,
    } = req.body;

    const createdBy = req.user._id;

    if (!title || !category || !difficulty || !totalQuestions || !questionType) {
      return res.status(400).json({
        message: "Required fields missing",

        success: false,
      });
    }
    const quiz = await Quiz.create({
      title,
      description,
     category,
      difficulty,
      totalQuestions,
      duration,
      passingMarks,
      totalMarks,
      questionType,
      isRandomized,
      isAdaptive,
      createdBy,
      generationStatus: "PENDING",
      generatedBy: "AI",
      status: "Draft",
    });
    return res.status(201).json({
      message: "Quiz created successfully",
      success: true,
      quiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find()

      .populate("createdBy", "name email")

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      message: "Quizzes fetched successfully",

      success: true,

      quizzes,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",

      success: false,
    });
  }
};

// GET QUIZ BY ID

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id)

      .populate("createdBy", "name email");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",

        success: false,
      });
    }

    return res.status(200).json({
      message: "Quiz fetched successfully",

      success: true,

      quiz,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",

      success: false,
    });
  }
};
