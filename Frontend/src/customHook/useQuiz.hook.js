import { creteQuiz, getAllQuiz, getSingleQuiz } from "@/API/quiz.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => creteQuiz(data),
    onSuccess: (response) => {
      toast.success(response?.message || "Quiz Created");
      queryClient.invalidateQueries({
        queryKey: ["All Quiz"],
      });
      console.log(response);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Quiz creation failed");
      console.log(error);
    },
  });
};
export const usegetAllQuiz=()=>{
    return useQuery({
        queryFn:getAllQuiz,
        queryKey:['Get All Quiz']
    })
}
export const useGetSingleQuizId=(id)=>{
    return useQuery({
        queryFn:()=>getSingleQuiz(id),
        queryKey:[id]
    })
}