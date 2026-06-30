import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Clock, CheckCircle, XCircle, BarChart3, Search, Filter, Download } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const attempts = [
  { id: "A001", quiz: "JavaScript Fundamentals", date: "2024-01-15", score: "92%", correct: 18, total: 20, time: "23 min", status: "Passed", accuracy: 90 },
  { id: "A002", quiz: "React Hooks Deep Dive", date: "2024-01-18", score: "78%", correct: 19, total: 25, time: "35 min", status: "Passed", accuracy: 76 },
  { id: "A003", quiz: "Python Data Structures", date: "2024-01-20", score: "65%", correct: 11, total: 18, time: "22 min", status: "Failed", accuracy: 61 },
  { id: "A004", quiz: "Aptitude Test #1", date: "2024-01-22", score: "88%", correct: 13, total: 15, time: "18 min", status: "Passed", accuracy: 86 },
  { id: "A005", quiz: "General Knowledge 2024", date: "2024-01-25", score: "76%", correct: 38, total: 50, time: "55 min", status: "Passed", accuracy: 76 },
  { id: "A006", quiz: "Machine Learning Basics", date: "2024-01-28", score: "52%", correct: 15, total: 30, time: "40 min", status: "Failed", accuracy: 50 },
]

export default function MyAttempts() {
  const [search, setSearch] = useState("")

  const filtered = attempts.filter(a => a.quiz.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Attempts</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Review your quiz attempt history</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            <Download size={16} /> Export
          </button>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search attempts..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {["Quiz", "Date", "Score", "Correct", "Time", "Status", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-gray-900 dark:text-white">{a.quiz}</div>
                      <div className="text-xs text-gray-400">ID: {a.id}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{a.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-lg font-bold ${parseInt(a.score) >= 80 ? "text-emerald-600" : parseInt(a.score) >= 60 ? "text-yellow-600" : "text-red-600"}`}>{a.score}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{a.correct}/{a.total}</td>
                    <td className="px-4 py-3.5 text-gray-500">{a.time}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        a.status === "Passed" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : "bg-red-50 dark:bg-red-900/20 text-red-600"
                      }`}>
                        {a.status === "Passed" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all">
                        <Eye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
