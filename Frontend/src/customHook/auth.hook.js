import { getCurrentUser, LoginUser, logoutUser } from "@/API/auth.api";

import { setUser, logoutUser as clearUser } from "@/store/authSlice";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export const useLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (response) => {
      console.log("LOGIN RESPONSE:", response);
      dispatch(setUser(response.data));
      toast.success("Login Successful");
      navigate("/dashboard", {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login Failed");
    },
  });
};
export const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await getCurrentUser();
      console.log("CURRENT USER:", response);
      dispatch(setUser(response.data));
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogoutHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(clearUser());
      toast.success("Logout Successful");
      navigate("/login", {
        replace: true,
      });
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });
};
