import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Crown, Star, TrendingUp, Filter, Users, Search } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const allUsers = [
  { rank: 1, name: "Sarah Johnson", avatar: "S", color: "from-violet-500 to-purple-600", score: 9842, quizzes: 45, streak: 15, badge: "🥇" },
  { rank: 2, name: "Alex Martinez", avatar: "A", color: "from-blue-500 to-cyan-500", score: 9651, quizzes: 42, streak: 12, badge: "🥈" },
  { rank: 3, name: "Priya Kapoor", avatar: "P", color: "from-emerald-500 to-green-600", score: 9420, quizzes: 38, streak: 10, badge: "🥉" },
  { rank: 4, name: "You", avatar: "Y", color: "from-orange-500 to-red-500", score: 8912, quizzes: 35, streak: 12, badge: "4", isUser: true },
  { rank: 5, name: "John Doe", avatar: "J", color: "from-pink-500 to-rose-600", score: 8745, quizzes: 33, streak: 8, badge: "5" },
  { rank: 6, name: "Emily Chen", avatar: "E", color: "from-cyan-500 to-teal-600", score: 8520, quizzes: 31, streak: 7, badge: "6" },
  { rank: 7, name: "Michael Brown", avatar: "M", color: "from-indigo-500 to-violet-600", score: 8340, quizzes: 29, streak: 6, badge: "7" },
  { rank: 8, name: "Lisa Wang", avatar: "L", color: "from-rose-500 to-pink-600", score: 8120, quizzes: 27, streak: 5, badge: "8" },
]

export default function Leaderboard() {
  const [search, setSearch] = useState("")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Top performers this month</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <Crown size={32} className="text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">9,842</div>
            <div className="text-xs text-gray-400">Top Score</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <Users size={32} className="text-violet-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">128</div>
            <div className="text-xs text-gray-400">Active Learners</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <TrendingUp size={32} className="text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">#4</div>
            <div className="text-xs text-gray-400">Your Rank</div>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  {["Rank", "User", "Score", "Quizzes", "Streak", "Badge"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((user, i) => (
                  <motion.tr key={user.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${
                      user.isUser ? "bg-violet-50 dark:bg-violet-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                    }`}>
                    <td className="px-4 py-3.5">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        user.rank <= 3 ? "text-lg" : "text-gray-500"
                      }`}>{user.badge}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold`}>{user.avatar}</div>
                        <span className={`font-medium ${user.isUser ? "text-violet-700 dark:text-violet-300" : "text-gray-900 dark:text-white"}`}>
                          {user.name} {user.isUser && "(You)"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{user.score.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{user.quizzes}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 text-orange-600 font-medium">
                        <Star size={12} /> {user.streak} days
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {user.rank <= 3 ? (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          user.rank === 1 ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600" :
                          user.rank === 2 ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400" :
                          "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
                        }`}>Top {user.rank}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
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
