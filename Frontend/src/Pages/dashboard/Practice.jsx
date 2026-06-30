import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Brain, Target, ArrowRight, Clock, BarChart3, BookOpen, Zap, Filter, Play } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const topics = [
  { name: "JavaScript", icon: "JS", progress: 75, color: "from-yellow-500 to-amber-600", lessons: 12, completed: 9 },
  { name: "React", icon: "R", progress: 60, color: "from-blue-500 to-cyan-600", lessons: 15, completed: 9 },
  { name: "Python", icon: "Py", progress: 45, color: "from-green-500 to-emerald-600", lessons: 18, completed: 8 },
  { name: "Data Structures", icon: "DS", progress: 30, color: "from-violet-500 to-purple-600", lessons: 20, completed: 6 },
  { name: "Algorithms", icon: "Al", progress: 20, color: "from-orange-500 to-red-600", lessons: 15, completed: 3 },
  { name: "System Design", icon: "SD", progress: 10, color: "from-pink-500 to-rose-600", lessons: 10, completed: 1 },
]

const weakAreas = ["Closures & Scope", "Array Methods", "Recursion", "Time Complexity", "SQL Joins"]

export default function Practice() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const filtered = topics

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Practice</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sharpen your skills with focused practice</p>
          </div>
          <div className="flex gap-2">
            {["all", "in-progress", "completed"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filter === f ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((topic, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => navigate(`/student/start-quiz/${topic.name.toLowerCase().replace(/\s+/g, "-")}`)}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white text-sm font-bold`}>{topic.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{topic.name}</h3>
                  <div className="text-xs text-gray-400">{topic.completed}/{topic.lessons} lessons</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500" style={{ width: `${topic.progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{topic.progress}%</span>
                <span className="text-xs text-violet-600 dark:text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">Continue <ArrowRight size={12} /></span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><Target size={20} className="text-violet-600" /> Weak Areas</h2>
            <div className="space-y-3">
              {weakAreas.map((area, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
                  <button onClick={() => navigate(`/student/start-quiz/${area.toLowerCase().replace(/\s+/g, "-")}`)} className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium">Practice</button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><Zap size={20} className="text-yellow-500" /> Quick Practice</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Random Quiz", icon: BookOpen, color: "from-violet-500 to-purple-600" },
                { label: "Daily Challenge", icon: Target, color: "from-blue-500 to-cyan-500" },
                { label: "Timed Test", icon: Clock, color: "from-orange-500 to-red-500" },
                { label: "Focus Mode", icon: Brain, color: "from-emerald-500 to-green-600" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <button key={i} onClick={() => navigate(`/student/start-quiz/${item.label.toLowerCase().replace(/\s+/g, "-")}`)} className={`p-4 rounded-xl bg-gradient-to-br ${item.color} text-white text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all`}>
                    <Icon size={20} className="mb-2 opacity-80" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
