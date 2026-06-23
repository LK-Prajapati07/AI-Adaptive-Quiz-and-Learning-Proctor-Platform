import mongoose from "mongoose";

const proctorSchema = new mongoose.Schema(
  {
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attempt",
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["NORMAL", "WARNING", "CHEATING", "DISQUALIFIED"],
      default: "NORMAL",
    },
    warnings: [
      {
        reason: {
          type: String,
        },

        riskScore: {
          type: Number,
        },
        snapshotUrl: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    detectedObjects: [
      {
        object: {
          type: String,
        },
        confidence: {
          type: Number,
        },
      },
    ],
    faceCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const Proctor = mongoose.model("Proctor", proctorSchema);
