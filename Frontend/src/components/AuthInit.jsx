import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser, logoutUser, setLoading } from "@/store/authSlice"
import { onAuthChange } from "@/services/firebaseAuth"

export default function AuthInit({ children }) {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((s) => s.auth)

  useEffect(() => {
    const unsub = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          _id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          email: firebaseUser.email,
          role: "Student",
          provider: "firebase",
          createdAt: firebaseUser.metadata?.creationTime,
        }))
      } else {
        dispatch(logoutUser())
      }
    })
    return unsub
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 animate-pulse" />
          <span className="text-sm text-gray-400">Loading...</span>
        </div>
      </div>
    )
  }

  return children
}
