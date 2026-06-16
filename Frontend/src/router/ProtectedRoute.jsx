
import { Spinner } from "@/components/ui/spinner"
import { useGetCurrentUser } from "@/customHook/auth.hook"
import { useSelector } from "react-redux"
import { toast } from "sonner"
const ProtectedRouter=({children})=>{
    const user=useSelector((state)=>state.user)
    const {error,isPending}=useGetCurrentUser()
    if(error){
        toast.error(error)
    }
    if(isPending){
        return (

            <div className="h-screen flex items-center justify-center">

                <div className="bg-sky-600 p-5">

                    <Spinner />

                </div>

            </div>

        );

    }
    if(!user){
         return (
            <Navigate 
                to="/login"
                replace
            />
        );
    }
    return children

}
export default ProtectedRoute;