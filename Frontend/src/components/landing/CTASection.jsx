import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 p-10 lg:p-16 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" animate={{ x: [0, -40, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Ready to Transform the Way You Learn?</h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">Join 15,000+ learners already using Quiz Genius to master new skills with AI-powered quizzes.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-10 py-4 rounded-2xl bg-white text-violet-600 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all">Get Started Free</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all">Schedule Demo</motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
