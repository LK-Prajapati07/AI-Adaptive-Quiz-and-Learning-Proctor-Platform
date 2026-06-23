import { geAllQuestions, generateQuestion, getQuestionsByQuizId } from "@/API/question.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

export const useQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, data }) => generateQuestion(quizId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Quiz Fetched", variables.quizId],
      });
    },
  });
};
export const usegetQuestionsByQuizId = (quizId) => {
  return useQuery({
    queryFn: () => getQuestionsByQuizId(quizId),
    queryKey: ["Quiz Fetched", quizId],
    enabled: !!quizId,
  });
};

export const useGetAllQuestion=()=>{
    return useQuery({
        queryFn:geAllQuestions
    })
}