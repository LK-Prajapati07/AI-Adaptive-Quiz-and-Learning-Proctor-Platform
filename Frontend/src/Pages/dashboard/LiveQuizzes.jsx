import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Timer, Award, Trophy, Zap, Clock, Filter, Search } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const liveQuizzes = [
  { title: "Weekly Coding Challenge", category: "Programming", participants: 156, timeLeft: "12:45", prize: "500 pts", startTime: "Ongoing", difficulty: "Medium" },
  { title: "Aptitude Speed Test", category: "Aptitude", participants: 89, timeLeft: "08:30", prize: "300 pts", startTime: "Ongoing", difficulty: "Easy" },
  { title: "JavaScript Masters", category: "Programming", participants: 234, timeLeft: "-", prize: "1000 pts", startTime: "Today 6:00 PM", difficulty: "Hard" },
  { title: "GK Challenge 2024", category: "General Knowledge", participants: 167, timeLeft: "-", prize: "250 pts", startTime: "Tomorrow 10:00 AM", difficulty: "Medium" },
  { title: "Math Olympiad", category: "Mathematics", participants: 98, timeLeft: "-", prize: "750 pts", startTime: "Jan 25, 3:00 PM", difficulty: "Hard" },
  { title: "Science Quiz Bowl", category: "Science", participants: 112, timeLeft: "-", prize: "500 pts", startTime: "Jan 26, 2:00 PM", difficulty: "Medium" },
]

export default function LiveQuizzes() {
  const [search, setSearch] = useState("")
  const filtered = liveQuizzes.filter(q => q.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Quizzes</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Compete in real-time with other learners</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search live quizzes..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-medium text-red-500">{q.startTime === "Ongoing" ? "LIVE" : "Upcoming"}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  q.difficulty === "Easy" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" :
                  q.difficulty === "Medium" ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600" :
                  "bg-red-50 dark:bg-red-900/20 text-red-600"
                }`}>{q.difficulty}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{q.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
                <span className="flex items-center gap-1"><Users size={12} /> {q.participants}</span>
                {q.timeLeft !== "-" && <span className="flex items-center gap-1"><Timer size={12} /> {q.timeLeft}</span>}
                <span className="flex items-center gap-1"><Award size={12} /> {q.prize}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {q.startTime}</span>
              </div>
              <button className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                q.startTime === "Ongoing"
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/30"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>
                {q.startTime === "Ongoing" ? "Join Now" : "Set Reminder"}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
