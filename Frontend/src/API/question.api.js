import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
export const generateQuestion=async(quizId,data)=>{
    try {
        const res=await API.post(`/api/question/${quizId}`,data)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}
export const getQuestionsByQuizId=async(quizId)=>{
    try {
        const res=await API.get(`/api/question/${quizId}`)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}
export const geAllQuestions=async()=>{
    try {
        const res=await API.get('/api/question')
        return res.data
    } catch (error) {
        toast.error(error)
    }
}