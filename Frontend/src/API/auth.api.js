import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});


export const LoginUser = async(data) => {
  try {

    const res = await API.post( //http://localhost:3000/api/auth/create-user
      "/api/auth/create-user",
      data
    );

    return res.data;

  } catch(error) {

    console.log("LOGIN API ERROR:", error);
    console.log("SERVER MESSAGE:", error.response?.data);

    toast.error(
      error.response?.data?.message ||
      "Login failed"
    );

    throw error; // important for react-query mutation

  }
};


export const logoutUser = async() => {
  try {

    const res = await API.post(
      "/api/auth/logout"
    );

    return res.data;

  } catch(error) {

    console.error(error);

    throw error;

  }
};


export const getCurrentUser = async() => {
  try {

    const res = await API.get(
      "/api/auth/me"
    );

    return res.data;

  } catch(error) {

    console.error(error);

    throw error;

  }
};