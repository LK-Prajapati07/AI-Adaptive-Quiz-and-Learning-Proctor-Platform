import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
})

// ====== MOCK DATABASE ======
const db = {
  quizzes: [
    { _id: "q1", title: "JavaScript Fundamentals", description: "Core JS concepts: closures, promises, hoisting", duration: 30, totalQuestions: 10, difficulty: "medium", createdAt: "2026-06-20", trainerId: "t1" },
    { _id: "q2", title: "React Hooks Deep Dive", description: "useState, useEffect, custom hooks patterns", duration: 45, totalQuestions: 15, difficulty: "hard", createdAt: "2026-06-18", trainerId: "t1" },
    { _id: "q3", title: "Python for Data Science", description: "NumPy, Pandas, visualization basics", duration: 20, totalQuestions: 8, difficulty: "easy", createdAt: "2026-06-15", trainerId: "t1" },
    { _id: "q4", title: "Data Structures & Algorithms", description: "Arrays, trees, graphs, sorting", duration: 60, totalQuestions: 20, difficulty: "hard", createdAt: "2026-06-12", trainerId: "t1" },
  ],
  questions: {
    q1: [
      { _id: "qq1", question: "What is a closure in JavaScript?", options: ["A function with its lexical scope", "A closed block of code", "A type of loop", "An error handler"], correctAnswer: "A function with its lexical scope" },
      { _id: "qq2", question: "What does the `useState` hook return?", options: ["A variable and a setter", "An object", "An array of two values", "A promise"], correctAnswer: "An array of two values" },
      { _id: "qq3", question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" },
      { _id: "qq4", question: "What is the output of `typeof null`?", options: ["null", "object", "undefined", "boolean"], correctAnswer: "object" },
      { _id: "qq5", question: "What is Promise.all() used for?", options: ["Race promises", "Run promises sequentially", "Wait for all promises", "Cancel promises"], correctAnswer: "Wait for all promises" },
      { _id: "qq6", question: "What does 'use strict' do?", options: ["Enables strict mode", "Strict typing", "Faster execution", "Disables warnings"], correctAnswer: "Enables strict mode" },
      { _id: "qq7", question: "Which is not a JS data type?", options: ["Symbol", "BigInt", "Float", "Undefined"], correctAnswer: "Float" },
    ],
    q2: [
      { _id: "qq8", question: "What is the first rule of hooks?", options: ["Only call hooks at top level", "Call hooks in loops", "Call hooks conditionally", "Call hooks outside components"], correctAnswer: "Only call hooks at top level" },
      { _id: "qq9", question: "What does useEffect cleanup function do?", options: ["Prevents memory leaks", "Renders UI", "Updates state", "Fetches data"], correctAnswer: "Prevents memory leaks" },
    ],
    q3: [
      { _id: "qq10", question: "Which library is used for numerical computing in Python?", options: ["NumPy", "React", "Django", "Flask"], correctAnswer: "NumPy" },
      { _id: "qq11", question: "What is Pandas primarily used for?", options: ["Data manipulation", "Web development", "Game dev", "Mobile apps"], correctAnswer: "Data manipulation" },
    ],
  },
  attempts: [],
}

// ====== HELPERS ======
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))
let attemptCounter = 0

// ====== EXISTING AUTH APIs ======
export const LoginUser = async (data) => {
  await delay()
  return { success: true, data: { _id: "u1", name: "John Doe", email: "john@example.com", role: data.role || "Student", provider: "password", createdAt: new Date().toISOString() } }
}

export const logoutUser = async () => {
  await delay()
  return { success: true, message: "Logged out" }
}

export const getCurrentUser = async () => {
  await delay()
  return { success: true, data: { _id: "u1", name: "John Doe", email: "john@example.com", role: "Student", provider: "password", createdAt: new Date().toISOString() } }
}

// ====== QUIZ APIs ======
export const createQuiz = async (data) => {
  await delay(500)
  const newQuiz = { _id: `q${Date.now()}`, ...data, createdAt: new Date().toISOString(), trainerId: "t1" }
  db.quizzes.push(newQuiz)
  return { success: true, data: newQuiz, message: "Quiz created!" }
}

export const getQuizzes = async () => {
  await delay()
  return { success: true, data: db.quizzes }
}

export const getQuizById = async (id) => {
  await delay()
  const quiz = db.quizzes.find((q) => q._id === id)
  return { success: true, data: quiz }
}

export const getAvailableQuizzes = async () => {
  await delay()
  return { success: true, data: db.quizzes }
}

export const generateAIQuestions = async (formData) => {
  await delay(2000)
  const topic = formData.get("topic") || "General"
  const count = Number(formData.get("count")) || 5
  const generated = Array.from({ length: count }, (_, i) => ({
    _id: `aiq${Date.now()}_${i}`,
    question: `AI-generated: Explain the concept of ${topic} - Part ${i + 1}?`,
    options: [
      `Definition of ${topic} option A`,
      `Definition of ${topic} option B`,
      `Definition of ${topic} option C`,
      `Definition of ${topic} option D`,
    ],
    correctAnswer: `Definition of ${topic} option A`,
  }))
  return { success: true, data: generated, message: `${count} questions generated from "${topic}"` }
}

export const getQuestions = async (quizId) => {
  await delay()
  return { success: true, data: db.questions[quizId] || db.questions.q1 }
}

export const startAttempt = async (quizId, studentImage) => {
  await delay(800)
  attemptCounter++
  const attempt = {
    _id: `attempt_${Date.now()}`,
    quizId,
    studentId: "u1",
    startedAt: new Date().toISOString(),
    status: "in-progress",
    currentQuestionIndex: 0,
    answers: [],
    proctorWarnings: 0,
    proctorStatus: "clean",
  }
  db.attempts.push(attempt)
  return { success: true, data: attempt }
}

export const submitAnswer = async ({ attemptId, questionId, answer }) => {
  await delay(400)
  const attempt = db.attempts.find((a) => a._id === attemptId)
  if (attempt) {
    attempt.answers.push({ questionId, answer, timestamp: new Date().toISOString() })
    attempt.currentQuestionIndex++
  }
  return { success: true, data: { nextIndex: attempt?.currentQuestionIndex || 0 } }
}

export const getNextQuestion = async (attemptId) => {
  await delay()
  const attempt = db.attempts.find((a) => a._id === attemptId)
  if (!attempt) return { success: true, data: null }
  const quizQuestions = db.questions[attempt.quizId] || db.questions.q1
  const q = quizQuestions[attempt.currentQuestionIndex]
  return { success: true, data: q || null }
}

export const getAttemptResult = async (attemptId) => {
  await delay(600)
  const attempt = db.attempts.find((a) => a._id === attemptId) || { answers: [], quizId: "q1" }
  const questions = db.questions[attempt.quizId] || db.questions.q1
  const correct = attempt.answers.filter((a) => {
    const q = questions.find((qq) => qq._id === a.questionId)
    return q && a.answer === q.correctAnswer
  }).length
  const total = attempt.answers.length || questions.length
  const score = Math.round((correct / total) * 100)
  return {
    success: true,
    data: {
      attemptId,
      score,
      correct,
      total,
      percentage: score,
      aiFeedback: score >= 80 ? "Excellent performance! Strong understanding of concepts." : score >= 60 ? "Good effort! Some areas need improvement." : "Keep practicing. Review the fundamentals and try again.",
      proctorStatus: attempt.proctorStatus || "clean",
      proctorWarnings: attempt.proctorWarnings || 0,
      answers: attempt.answers,
    },
  }
}

export const getStudentResults = async () => {
  await delay()
  return {
    success: true,
    data: [
      { _id: "r1", quizTitle: "JavaScript Fundamentals", score: 85, total: 10, percentage: 85, date: "2026-06-22", proctorStatus: "clean", maxScore: 100 },
      { _id: "r2", quizTitle: "React Hooks Deep Dive", score: 12, total: 15, percentage: 80, date: "2026-06-20", proctorStatus: "clean", maxScore: 100 },
      { _id: "r3", quizTitle: "Python for Data Science", score: 7, total: 8, percentage: 88, date: "2026-06-18", proctorStatus: "warning", maxScore: 100 },
      { _id: "r4", quizTitle: "Data Structures & Algorithms", score: 4, total: 10, percentage: 40, date: "2026-06-15", proctorStatus: "clean", maxScore: 100 },
      { _id: "r5", quizTitle: "Machine Learning Basics", score: 3, total: 10, percentage: 30, date: "2026-06-10", proctorStatus: "disqualified", maxScore: 100 },
    ],
  }
}

export const getCandidateReports = async () => {
  await delay()
  return {
    success: true,
    data: [
      { _id: "c1", name: "Alice Smith", email: "alice@example.com", quizzesTaken: 5, avgScore: 82, riskLevel: "low", warnings: 1, status: "pass" },
      { _id: "c2", name: "Bob Johnson", email: "bob@example.com", quizzesTaken: 3, avgScore: 65, riskLevel: "medium", warnings: 3, status: "review" },
      { _id: "c3", name: "Carol Williams", email: "carol@example.com", quizzesTaken: 7, avgScore: 91, riskLevel: "low", warnings: 0, status: "pass" },
      { _id: "c4", name: "David Brown", email: "david@example.com", quizzesTaken: 2, avgScore: 45, riskLevel: "high", warnings: 5, status: "disqualified" },
    ],
  }
}

export const getProctorReports = async () => {
  await delay()
  return {
    success: true,
    data: [
      { _id: "p1", studentName: "Alice Smith", quizTitle: "JavaScript Fundamentals", date: "2026-06-22", warnings: 1, riskLevel: "low", finalDecision: "pass" },
      { _id: "p2", studentName: "Bob Johnson", quizTitle: "React Hooks Deep Dive", date: "2026-06-20", warnings: 3, riskLevel: "medium", finalDecision: "review" },
      { _id: "p3", studentName: "David Brown", quizTitle: "Data Structures", date: "2026-06-19", warnings: 5, riskLevel: "high", finalDecision: "disqualified" },
    ],
  }
}
