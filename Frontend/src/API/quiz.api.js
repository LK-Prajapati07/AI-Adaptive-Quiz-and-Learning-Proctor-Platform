import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
export const creteQuiz=async(data)=>{
    try {
        const res=await API.post("/api/quiz",data)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}
export const getAllQuiz=async()=>{
    try {
        const res=await API.get("/api/quiz")
        return res.data
    } catch (error) {
        toast.error(error)
    }
}
export const getSingleQuiz=async(id)=>{
    try {
        const res=await API.get(`/api/quiz/${id}`)
        return res.data
    } catch (error) {
        toast.error(error)
    }
}