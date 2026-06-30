import { getCurrentUser, LoginUser, logoutUser } from "@/API/auth.api"
import { setUser, logoutUser as logoutAction } from "@/store/authSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const useLoginHook = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      dispatch(setUser(data?.data || data))
      toast.success("Login successful!")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed")
    },
  })
}

export const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  return useQuery({
    queryKey: ["Get Current Fetch"],
    queryFn: async () => {
      const res = await getCurrentUser()
      if (res?.data) dispatch(setUser(res.data))
      return res?.data
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}

export const useLogoutHook = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logoutAction())
      toast.success("Logged out successfully")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed")
    },
  })
}
