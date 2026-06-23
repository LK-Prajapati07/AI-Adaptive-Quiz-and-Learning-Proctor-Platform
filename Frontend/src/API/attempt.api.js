import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
export const startAttempt=async(quizId,data)=>{
    try {
        const res=API.post(`/api/quizattempt/start/${quizId}`,data)
        return res.data
    } catch (error) {
        toast.error(error)
    }

}
export const submitQuiz=async(attemptId,data)=>{
    try{
        const res=API.post(`/api/quizattempt/submit/${attemptId}`,data)
        return res.data
    }catch(error){
        toast.error(error)
    }
}
export const result=async(attemptId)=>{
    try {
        const res=API.get(`/api/quizattempt/result/${attemptId}`)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}
export const getUserAttempts=async()=>{
    try {
        const res=API.get(`/api/quizattempt`)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}