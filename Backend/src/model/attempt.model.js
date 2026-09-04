import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },

    questions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },

        userAnswer: {
          type: String,
        },

        expectedAnswer: {
          type: String,
        },
        
        score: {
          type: Number,
        },
        

        maxScore: {
          type: Number,
        },

        similarityScore: {
          type: Number,
        },

        evaluationMethod: {
          type: String,

          enum: ["EMBEDDING", "LLM", "NODE"],
        },

        feedback: String,

        difficulty: {
          type: String,
        },
      },
    ],

    totalScore: Number,

    percentage: Number,
    maxScore:Number,

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
    status: {
      type: String,

      enum: ["RUNNING", "COMPLETED", "EXPIRED"],

      default: "RUNNING",
    },
    studentImageUrl: {
      type: String,
      required: true,
    },
    
  },
  {

    timestamps: true,
  },
);
export const Attempt = mongoose.model("Attempt", attemptSchema);
