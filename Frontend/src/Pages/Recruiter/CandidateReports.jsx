import { motion } from "framer-motion"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetCandidateReports } from "@/customHook/quiz.hook"

const demoData = [
  { _id: "c1", name: "Alice Smith", email: "alice@example.com", quizzesTaken: 5, avgScore: 82, riskLevel: "low", warnings: 1, status: "pass" },
  { _id: "c2", name: "Bob Johnson", email: "bob@example.com", quizzesTaken: 3, avgScore: 65, riskLevel: "medium", warnings: 3, status: "review" },
  { _id: "c3", name: "Carol Williams", email: "carol@example.com", quizzesTaken: 7, avgScore: 91, riskLevel: "low", warnings: 0, status: "pass" },
  { _id: "c4", name: "David Brown", email: "david@example.com", quizzesTaken: 2, avgScore: 45, riskLevel: "high", warnings: 5, status: "disqualified" },
]

export default function CandidateReports() {
  const { data } = useGetCandidateReports()
  const candidates = data?.data || demoData

  const riskColors = { low: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", medium: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400", high: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" }
  const statusIcons = { pass: "✅", review: "⚠️", disqualified: "❌" }
  const statusColors = { pass: "text-green-600 dark:text-green-400", review: "text-yellow-600 dark:text-yellow-400", disqualified: "text-red-600 dark:text-red-400" }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white text-lg">👥</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidate Reports</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overview of all candidate performances</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Quizzes</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Avg Score</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Risk</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Warnings</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{c.name}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{c.email}</td>
                    <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{c.quizzesTaken}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-semibold ${c.avgScore >= 70 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{c.avgScore}%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${riskColors[c.riskLevel]}`}>{c.riskLevel}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{c.warnings}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-medium ${statusColors[c.status]}`}>{statusIcons[c.status]} {c.status}</span>
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
