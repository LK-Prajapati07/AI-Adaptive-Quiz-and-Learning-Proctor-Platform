import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Filter } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const results = [
  { month: "Sep", score: 72, avg: 65, quizzes: 3 },
  { month: "Oct", score: 78, avg: 68, quizzes: 5 },
  { month: "Nov", score: 85, avg: 70, quizzes: 4 },
  { month: "Dec", score: 82, avg: 71, quizzes: 6 },
  { month: "Jan", score: 88, avg: 73, quizzes: 5 },
  { month: "Feb", score: 92, avg: 74, quizzes: 3 },
]

const recentResults = [
  { quiz: "JavaScript Fundamentals", score: 92, avg: 76, rank: "#3", date: "Jan 15" },
  { quiz: "React Hooks Deep Dive", score: 78, avg: 65, rank: "#8", date: "Jan 18" },
  { quiz: "Python Data Structures", score: 65, avg: 70, rank: "#15", date: "Jan 20" },
  { quiz: "Aptitude Test #1", score: 88, avg: 72, rank: "#2", date: "Jan 22" },
  { quiz: "General Knowledge 2024", score: 76, avg: 68, rank: "#7", date: "Jan 25" },
]

export default function Results() {
  const [range, setRange] = useState("6m")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Results & Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your performance over time</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30">
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Average Score", value: "82%", change: "+5%", up: true, color: "from-violet-500 to-purple-600" },
            { label: "Best Score", value: "92%", change: "JavaScript", up: true, color: "from-blue-500 to-cyan-500" },
            { label: "Total Quizzes", value: "28", change: "+3 this month", up: true, color: "from-emerald-500 to-green-600" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <BarChart3 size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${s.up ? "text-emerald-600" : "text-red-600"}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <BarChart3 size={20} className="text-violet-600" /> Performance Trend
            </h2>
            <div className="flex items-end gap-3 h-40">
              {results.map((r, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-gray-400">{r.score}%</span>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg relative" style={{ height: 140 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(r.score / 100) * 140}px` }} transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-500 to-blue-500 rounded-t-lg" />
                  </div>
                  <span className="text-[10px] text-gray-400">{r.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Results</h2>
            <div className="space-y-3">
              {recentResults.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{r.quiz}</div>
                    <div className="text-xs text-gray-500">Avg: {r.avg}% · Rank: {r.rank}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${r.score >= 80 ? "text-emerald-600" : r.score >= 60 ? "text-yellow-600" : "text-red-600"}`}>{r.score}%</div>
                    <div className="text-[10px] text-gray-400">{r.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
