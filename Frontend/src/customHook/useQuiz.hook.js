import { creteQuiz, getAllQuiz, getSingleQuiz } from "@/API/quiz.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// CREATE QUIZ
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: creteQuiz,
    onSuccess: (response) => {
      toast.success(response?.message || "Quiz Created");
      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Quiz creation failed");
    },
  });
};
// GET ALL QUIZ
export const useGetAllQuiz = () => {
  return useQuery({
   queryKey: ["quiz"],
    queryFn: getAllQuiz,
  });
};
// GET SINGLE QUIZ
export const useGetSingleQuizId = (id) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getSingleQuiz(id),
    enabled: Boolean(id),
  });
};
