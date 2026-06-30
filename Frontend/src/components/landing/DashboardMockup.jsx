import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  { num: "01", title: "Create Account", icon: "📝" },
  { num: "02", title: "Generate AI Quiz", icon: "🤖" },
  { num: "03", title: "Attempt Assessment", icon: "🎯" },
  { num: "04", title: "Analyze Performance", icon: "📈" },
]

export default function DashboardMockup() {
  const [currentStep, setCurrentStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrentStep((p) => (p + 1) % steps.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs text-gray-400 dark:text-gray-500 font-medium">Quiz Genius Dashboard</div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-sm">Q</div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Welcome back, Alex</div>
                <div className="text-xs text-gray-400">Student · 4.9 GPA</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-sm">🔥</div>
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-sm">⚡</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Quizzes", value: "12", change: "+3" },
              { label: "Avg Score", value: "87%", change: "+5%" },
              { label: "Streak", value: "7", change: "days" },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-400 dark:text-gray-500">{s.label}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-green-500">{s.change}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { title: "JavaScript Fundamentals", progress: 80 },
              { title: "React Hooks Deep Dive", progress: 45 },
              { title: "Python for Data Science", progress: 90 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.title}</span>
                    <span className="text-gray-400">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-100 dark:border-violet-800/30"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{steps[currentStep].icon}</span>
                <div>
                  <div className="text-xs font-semibold text-violet-600 dark:text-violet-400">{steps[currentStep].num}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{steps[currentStep].title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl flex items-center justify-center text-2xl">🏆</motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl flex items-center justify-center text-xl">🎯</motion.div>
    </div>
  )
}
