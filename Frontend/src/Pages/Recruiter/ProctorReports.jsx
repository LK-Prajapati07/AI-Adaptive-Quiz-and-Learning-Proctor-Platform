import { motion } from "framer-motion"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetProctorReports } from "@/customHook/quiz.hook"

const demoData = [
  { _id: "p1", studentName: "Alice Smith", quizTitle: "JavaScript Fundamentals", date: "2026-06-22", warnings: 1, riskLevel: "low", finalDecision: "pass" },
  { _id: "p2", studentName: "Bob Johnson", quizTitle: "React Hooks Deep Dive", date: "2026-06-20", warnings: 3, riskLevel: "medium", finalDecision: "review" },
  { _id: "p3", studentName: "David Brown", quizTitle: "Data Structures", date: "2026-06-19", warnings: 5, riskLevel: "high", finalDecision: "disqualified" },
]

export default function ProctorReports() {
  const { data } = useGetProctorReports()
  const reports = data?.data || demoData

  const riskColors = { low: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", medium: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400", high: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" }
  const decisionColors = { pass: "text-green-600 dark:text-green-400", review: "text-yellow-600 dark:text-yellow-400", disqualified: "text-red-600 dark:text-red-400" }
  const decisionIcons = { pass: "✅", review: "⚠️", disqualified: "❌" }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">🛡️</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Proctor Reports</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI proctoring monitoring results</p>
          </div>
        </div>

        <div className="grid gap-4">
          {reports.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{r.studentName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[r.riskLevel]}`}>{r.riskLevel}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <span>📝 {r.quizTitle}</span>
                    <span>📅 {new Date(r.date).toLocaleDateString()}</span>
                    <span>⚠️ {r.warnings} warnings</span>
                  </div>
                </div>
                <div className={`text-right font-semibold ${decisionColors[r.finalDecision]}`}>
                  <div className="text-sm">{decisionIcons[r.finalDecision]}</div>
                  <div className="text-xs capitalize">{r.finalDecision}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
