import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { X, Award, BarChart3, Brain, Shield, Zap, Users, BookOpen, TrendingUp, Target, Clock, Sparkles } from "lucide-react"
import DashboardMockup from "@/components/landing/DashboardMockup"

const features = [
  { icon: Brain, title: "AI Adaptive Quizzes", desc: "Questions that adapt to your skill level in real-time", color: "from-violet-500 to-purple-600" },
  { icon: Shield, title: "AI Proctoring", desc: "Camera-based monitoring with face detection & anti-cheating", color: "from-blue-500 to-cyan-500" },
  { icon: BarChart3, title: "Smart Analytics", desc: "Track performance trends, weak areas, and growth metrics", color: "from-emerald-500 to-green-600" },
  { icon: Award, title: "Certificates & Badges", desc: "Earn verifiable certificates and achievement badges", color: "from-amber-500 to-orange-600" },
  { icon: Zap, title: "Live Quizzes", desc: "Compete in real-time with leaderboards & prizes", color: "from-pink-500 to-rose-600" },
  { icon: Users, title: "Study Groups", desc: "Collaborate and learn together with peers", color: "from-indigo-500 to-violet-600" },
  { icon: BookOpen, title: "Question Bank", desc: "5000+ curated questions across 10+ categories", color: "from-teal-500 to-emerald-600" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Daily streaks, study time, and performance heatmaps", color: "from-red-500 to-pink-600" },
  { icon: Target, title: "Goal Setting", desc: "Set daily targets and get AI-recommended study plans", color: "from-purple-500 to-indigo-600" },
  { icon: Clock, title: "Timed Challenges", desc: "Race against the clock to sharpen your speed", color: "from-cyan-500 to-blue-600" },
  { icon: Sparkles, title: "AI Recommendations", desc: "Personalized quiz suggestions based on your performance", color: "from-sky-500 to-indigo-600" },
]

export default function HeroSection() {
  const navigate = useNavigate()
  const [showVideo, setShowVideo] = useState(false)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const nextStep = useCallback(() => setStep((s) => (s + 1) % features.length), [])

  useEffect(() => {
    if (!showVideo) { setStep(0); setProgress(0); return }
    const timer = setInterval(nextStep, 4000)
    const prog = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 40)
    return () => { clearInterval(timer); clearInterval(prog) }
  }, [showVideo, nextStep])

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-200/50 dark:border-violet-700/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">AI-Powered Learning Platform</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gray-900 dark:text-white">Master Any Subject with </span>
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">AI Adaptive Quizzes</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
              Experience personalized learning with adaptive quizzes, AI-powered proctoring, and intelligent analytics that evolve with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(139,92,246,0.3)" }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/register")}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-lg shadow-xl shadow-violet-600/20 overflow-hidden">
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setShowVideo(true)}
                className="group px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:border-violet-300 dark:hover:border-violet-500 transition-colors flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">▶</span>
                Watch Demo
              </motion.button>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
              <div className="flex -space-x-2">
                {["S", "M", "E", "D", "L"].map((l, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br ${
                    ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-500", "from-emerald-500 to-green-600", "from-orange-500 to-red-500", "from-pink-500 to-rose-600"][i]
                  } flex items-center justify-center text-white text-xs font-semibold`}>{l}</div>
                ))}
              </div>
              <div><span className="font-semibold text-gray-900 dark:text-white">15,000+</span> Learners</div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              <div>⭐ 4.9/5 Rating</div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <DashboardMockup />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <button onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                <X size={18} />
              </button>

              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6 flex flex-col">
                {/* Logo header */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">🎓</span>
                  <span className="text-lg font-bold text-white">Quiz <span className="text-blue-400">Genius</span></span>
                </div>

                {/* Animated feature showcase */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div key={step}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center p-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${features[step].color} flex items-center justify-center shadow-lg mb-5`}>
                        {(() => { const Icon = features[step].icon; return <Icon size={36} className="text-white" /> })()}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{features[step].title}</h3>
                      <p className="text-gray-400 text-base max-w-md">{features[step].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots & features strip */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 justify-center">
                    {features.map((f, i) => (
                      <button key={i} onClick={() => setStep(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-violet-500" : "bg-white/20 hover:bg-white/40"}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 justify-center text-xs text-gray-500">
                    <Clock size={12} /> Auto-rotating demo &middot; {step + 1}/{features.length} features
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
