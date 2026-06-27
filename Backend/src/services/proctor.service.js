import axios from "axios";
import FormData from "form-data";

import { Proctor } from "../model/proctor.model.js";
import { Attempt } from "../model/attempt.model.js";

export const analyzeProctor = async ({ userId, attemptId, frameBuffer }) => {
  try {
    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Attempt not found");
    }
    const formData = new FormData();
    formData.append("frame", frameBuffer, {
      filename: "frame.jpg",
      contentType: "image/jpeg",
    });
    formData.append("student_image_url", attempt.studentImageUrl);
    const response = await axios.post(
      "http://127.0.0.1:8000/proctor/analyze",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    const result = response.data;
    const proctor = await Proctor.findOne({
      attempt: attemptId,
    });
    if (!proctor) {
      throw new Error("Proctor session not found");
    }
    proctor.riskScore = result.total_risk;
    proctor.faceCount = result.faceCount || 1;
    proctor.detectedObjects = result.detectedObjects || [];
    // only save warnings
    if (result.status !== "NORMAL") {
      proctor.warnings.push({
        reason: result.reason || result.status,
        riskScore: result.total_risk,
      });
    }
    if (proctor.warnings.length >= 3) {
      proctor.status = "CHEATING";
      attempt.status = "DISQUALIFIED";
      await attempt.save();
    } else {
      proctor.status = result.status;
    }
    await proctor.save();

    return {
      result,

      proctor: {
        status: proctor.status,

        warnings: proctor.warnings.length,

        riskScore: proctor.riskScore,
      },
    };
  } catch (error) {
    console.log(error.response?.data || error.message);

    throw error;
  }
};
