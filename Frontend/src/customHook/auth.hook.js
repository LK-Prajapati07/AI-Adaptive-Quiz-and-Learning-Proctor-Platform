import { getCurrentUser, LoginUser, logoutUser } from "@/API/auth.api"
import { setUser } from "@/store/authSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const useLoginHook=()=>{
    const dispatch=useDispatch()
    return useMutation({
        mutationFn:LoginUser,
        onSuccess:(data)=>{
            dispatch(setUser(data))
            toast.success(`Data Create Successfull ${data}`)
        },
        onError:(error)=>{
            toast.error(error)
        }
    })
}
export const useGetCurrentUser=()=>{
    const dispatch=useDispatch()
    return useQuery({
        queryKey:['Get Current Fetch'],
        queryFn:async()=>{
            const data=await getCurrentUser()
            dispatch(setUser(data))
            return user
        },
        retry:false
    })
}
export const useLogoutHook=()=>{
    const dispatch=useDispatch()
    return useMutation({
        mutationFn:logoutUser,
        onSuccess:(data)=>{
            dispatch(logoutUser(data))
            toast.success(`Data Create Successfull ${data}`)
        },
        onError:(error)=>{
            toast.error(error)
        }
    })
    
}