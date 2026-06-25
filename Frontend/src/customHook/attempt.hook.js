import {
  startAttempt,
  submitQuiz,
  result,
  getUserAttempts,
} from "@/API/attempt.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
export const useStartAttempt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ quizId, data }) => startAttempt(quizId, data),
    onSuccess: (response) => {
      toast.success(response?.message || "Quiz Started");
      queryClient.invalidateQueries({
        queryKey: ["attempts"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to start quiz");
    },
  });
};
export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ attemptId, data }) => submitQuiz(attemptId, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["attempts"],
      });

      console.log(response);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Submit failed");
    },
  });
};
export const useResult = (attemptId) => {
  return useQuery({
    queryKey: ["result", attemptId],

    queryFn: () => result(attemptId),

    enabled: !!attemptId,
  });
}; 
export const useUserAttempts = () => {
  return useQuery({
    queryKey: ["attempts"],

    queryFn: getUserAttempts,
  });
};
