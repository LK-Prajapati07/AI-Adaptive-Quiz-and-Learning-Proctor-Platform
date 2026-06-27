import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// =========================
// Start Quiz Attempt
// =========================

export const startAttempt = async (quizId, data) => {
  try {
    const response = await API.post(`/api/quizattempt/start/${quizId}`, data);

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to start quiz.");

    throw error;
  }
};

// =========================
// Submit Quiz Answer
// =========================

export const submitQuiz = async (attemptId, data) => {
  try {
    const response = await API.post(
      `/api/quizattempt/submit/${attemptId}`,
      data,
    );

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to submit answer.");

    throw error;
  }
};

// =========================
// Get Attempt Result
// =========================

export const getAttemptResult = async (attemptId) => {
  try {
    const response = await API.get(`/api/quizattempt/result/${attemptId}`);

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch result.");

    throw error;
  }
};

// =========================
// Get User Attempts
// =========================

export const getUserAttempts = async () => {
  try {
    const response = await API.get("/api/quizattempt");

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch attempts.");

    throw error;
  }
};
