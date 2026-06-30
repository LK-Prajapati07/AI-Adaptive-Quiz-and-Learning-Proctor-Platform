import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/firebase"
import { signInWithEmail } from "@/services/firebaseAuth"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { role: "Student" }
  })

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address"

  const loginHandler = async (data) => {
    setLoading(true)
    try {
      await signInWithEmail(data.email, data.password)
      toast.success("Welcome back!")
      navigate("/dashboard")
    } catch (err) {
      const msg =
        err.code === "auth/user-not-found" ? "No account found with this email" :
        err.code === "auth/wrong-password" || err.code === "auth/invalid-credential" ? "Invalid email or password" :
        err.code === "auth/invalid-email" ? "Enter a valid email address" :
        err.code === "auth/too-many-requests" ? "Too many attempts. Try again later." :
        err.code === "auth/network-request-failed" ? "Network error. Check your connection." :
        "Invalid email or password"
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success("Google sign-in successful!")
      navigate("/dashboard")
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message || "Google sign-in failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 pt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-800 p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl mx-auto mb-4">🎓</div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Quiz Genius</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Continue your learning journey</p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" {...register("email", { required: "Email is required", validate: validateEmail })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Login as</label>
              <select {...register("role")} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                <option value="Student">Student</option>
                <option value="Trainer">Trainer</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:opacity-60 transition-all">
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">OR</span></div>
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            onClick={handleGoogleSignIn} disabled={loading}
            className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-60">
            <FcGoogle className="text-xl" /> Continue with Google
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don&apos;t have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Register</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
