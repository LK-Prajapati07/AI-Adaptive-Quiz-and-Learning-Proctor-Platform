import mongoose from "mongoose";


const questionSchema = new mongoose.Schema(
  {

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true
    },

    question: {
      type: String,
      required: true,
      trim: true
    },

    questionType: {
      type: String,

      enum: [
        "MCQ",
        "TRUE_FALSE",
        "FILL_BLANK",
        "SUBJECTIVE",

      ],

      required: true
    },


    options: [
      {
        type: String,
        trim: true
      }
    ],


    // MCQ / TrueFalse / Fill blank
    correctAnswer: {

      type: String,

      default: null

    },


    // AI evaluation based questions
    expectedAnswer: {

      type: String,

      default: null

    },


    difficulty: {

      type: String,

      enum: [
        "Easy",
        "Medium",
        "Hard"
        
      ],

      required: true

    },
    marks: {

      type: Number,

      default: 1

    },


    explanation: {

      type: String,

      default: "",

      trim: true

    },


    generatedBy: {

      type: String,

      enum: [
        "AI",
        "Teacher"
      ],

      default: "AI"

    }

  },

  {
    timestamps: true
  }
)



export const Question =
mongoose.model(
  "Question",
  questionSchema
)