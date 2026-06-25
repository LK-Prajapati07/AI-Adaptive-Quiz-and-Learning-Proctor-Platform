import {
  geAllQuestions,
  generateQuestion,
  getQuestionsByQuizId,
} from "@/API/question.api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

// GENERATE QUESTION

export const useGenerateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, data }) => generateQuestion(quizId, data),

    onSuccess: (response, variables) => {
      toast.success(response?.message || "Questions Generated");

      queryClient.invalidateQueries({
        queryKey: ["questions", variables.quizId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Question generation failed",
      );
    },
  });
};

// GET QUESTIONS BY QUIZ ID

export const useGetQuestionsByQuizId = (quizId) => {
  return useQuery({
    queryKey: ["questions", quizId],

    queryFn: () => getQuestionsByQuizId(quizId),

    enabled: !!quizId,
  });
};

// GET ALL QUESTIONS

export const useGetAllQuestion = () => {
  return useQuery({
    queryKey: ["questions"],

    queryFn: geAllQuestions,
  });
};
