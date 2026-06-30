import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  getAvailableQuizzes,
  generateAIQuestions,
  getQuestions,
  startAttempt,
  submitAnswer,
  getNextQuestion,
  getAttemptResult,
  getStudentResults,
  getCandidateReports,
  getProctorReports,
} from "@/API/quiz.api"

export const useCreateQuiz = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      toast.success("Quiz created successfully!")
      queryClient.invalidateQueries({ queryKey: ["quizzes"] })
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to create quiz"),
  })
}

export const useGetQuizzes = () =>
  useQuery({ queryKey: ["quizzes"], queryFn: getQuizzes })

export const useGetQuizById = (id) =>
  useQuery({ queryKey: ["quiz", id], queryFn: () => getQuizById(id), enabled: !!id })

export const useGetAvailableQuizzes = () =>
  useQuery({ queryKey: ["available-quizzes"], queryFn: getAvailableQuizzes })

export const useGenerateAIQuestions = () =>
  useMutation({
    mutationFn: generateAIQuestions,
    onSuccess: () => toast.success("Questions generated successfully!"),
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to generate questions"),
  })

export const useGetQuestions = (quizId) =>
  useQuery({ queryKey: ["questions", quizId], queryFn: () => getQuestions(quizId), enabled: !!quizId })

export const useStartAttempt = () =>
  useMutation({
    mutationFn: ({ quizId, studentImage }) => startAttempt(quizId, studentImage),
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to start attempt"),
  })

export const useSubmitAnswer = () =>
  useMutation({
    mutationFn: submitAnswer,
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to submit answer"),
  })

export const useGetNextQuestion = (attemptId) =>
  useQuery({
    queryKey: ["next-question", attemptId],
    queryFn: () => getNextQuestion(attemptId),
    enabled: false,
  })

export const useGetAttemptResult = (attemptId) =>
  useQuery({
    queryKey: ["attempt-result", attemptId],
    queryFn: () => getAttemptResult(attemptId),
    enabled: !!attemptId,
  })

export const useGetStudentResults = () =>
  useQuery({ queryKey: ["student-results"], queryFn: getStudentResults })

export const useGetCandidateReports = () =>
  useQuery({ queryKey: ["candidate-reports"], queryFn: getCandidateReports })

export const useGetProctorReports = () =>
  useQuery({ queryKey: ["proctor-reports"], queryFn: getProctorReports })
