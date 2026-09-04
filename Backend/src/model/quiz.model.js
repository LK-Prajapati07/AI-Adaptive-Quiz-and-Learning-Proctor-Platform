import mongoose from "mongoose";


const quizSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },


    description: {
      type: String,
      default: "",
      trim: true
    },
    category: {
      type: String,
      enum: [
        "Programming",
        "Aptitude",
        "General Knowledge",
        "Science",
        "Mathematics",
        "English",
        "Interview Preparation"
      ],
      required: true
    },
    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Medium",
        "Hard",
        "Mixed"
      ],
      required: true
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
    totalQuestions: {
      type: Number,
      required: true
    },
    // Cloudinary PDF URL
    pdfUrl: {
      type: String,
      default: "",
      required:true
    },
    duration: {
      type: Number, // minutes
      default: 30
    },
    passingMarks: {
      type: Number,
      default: 0
    },
    totalMarks: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true
    },
    // AI generation tracking
    generationStatus: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "FAILED"
      ],
      default: "PENDING"
    },
    generatedBy: {
      type: String,
      enum: [
        "AI",
        "Manual"
      ],
      default: "AI"
    },
    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Archived"
      ],
      default: "Draft"
    },
   isRandomized: {
      type: Boolean,
      default: true
    },
    isAdaptive: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps:true
  }
)



export const Quiz =
mongoose.model(
  "Quiz",
  quizSchema
)