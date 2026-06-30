import { useState } from "react"
import { motion } from "framer-motion"
import { Target, Trophy, Flame, Zap, Crown, Star, Brain, BookOpen, Lock, CheckCircle, Medal } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const allAchievements = [
  { name: "Streak Master", icon: Flame, desc: "Maintain a 7-day learning streak", color: "from-orange-500 to-red-500", earned: true, date: "Jan 10, 2024", xp: 500 },
  { name: "Quiz Champion", icon: Trophy, desc: "Score 100% on any quiz", color: "from-yellow-500 to-amber-600", earned: true, date: "Jan 5, 2024", xp: 1000 },
  { name: "Fast Learner", icon: Zap, desc: "Complete 5 quizzes in a single day", color: "from-blue-500 to-cyan-500", earned: false, progress: 3, target: 5, xp: 750 },
  { name: "Top Performer", icon: Crown, desc: "Reach top 10 on the leaderboard", color: "from-violet-500 to-purple-600", earned: false, progress: 4, target: 10, xp: 1500 },
  { name: "Knowledge Seeker", icon: Brain, desc: "Complete 25 quizzes total", color: "from-green-500 to-emerald-600", earned: false, progress: 18, target: 25, xp: 2000 },
  { name: "Bookworm", icon: BookOpen, desc: "Bookmark 50 questions", color: "from-pink-500 to-rose-600", earned: false, progress: 23, target: 50, xp: 500 },
  { name: "Century Club", icon: Star, desc: "Score 100% on a hard difficulty quiz", color: "from-indigo-500 to-violet-600", earned: true, date: "Dec 15, 2023", xp: 2000 },
  { name: "Dedicated Learner", icon: Medal, desc: "Study for 30 days total", color: "from-teal-500 to-cyan-600", earned: false, progress: 24, target: 30, xp: 2500 },
]

export default function Achievements() {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all" ? allAchievements : filter === "earned" ? allAchievements.filter(a => a.earned) : allAchievements.filter(a => !a.earned)

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your milestones and earn badges</p>
          </div>
          <div className="flex gap-2">
            {["all", "earned", "locked"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filter === f ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">2</div>
            <div className="text-xs text-gray-400">Earned</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">6</div>
            <div className="text-xs text-gray-400">In Progress</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">10,250</div>
            <div className="text-xs text-gray-400">Total XP</div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((ach, i) => {
            const Icon = ach.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`p-5 rounded-2xl border transition-all ${
                  ach.earned
                    ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-lg"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-75"
                }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ach.color} flex items-center justify-center ${!ach.earned && "grayscale"}`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  {ach.earned ? (
                    <CheckCircle size={18} className="text-emerald-500" />
                  ) : (
                    <Lock size={16} className="text-gray-300 dark:text-gray-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{ach.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ach.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium text-violet-600 dark:text-violet-400">+{ach.xp} XP</span>
                  {ach.earned && ach.date && <span className="text-[10px] text-gray-400">{ach.date}</span>}
                </div>
                {!ach.earned && ach.progress !== undefined && (
                  <div className="mt-3">
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: `${(ach.progress / ach.target) * 100}%` }} />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">{ach.progress}/{ach.target}</div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
