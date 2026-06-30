import { motion } from "framer-motion"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetStudentResults } from "@/customHook/quiz.hook"

const demoResults = [
  { _id: "r1", quizTitle: "JavaScript Fundamentals", score: 85, total: 10, percentage: 85, date: "2026-06-22", proctorStatus: "clean" },
  { _id: "r2", quizTitle: "React Hooks Deep Dive", score: 12, total: 15, percentage: 80, date: "2026-06-20", proctorStatus: "clean" },
  { _id: "r3", quizTitle: "Python for Data Science", score: 7, total: 8, percentage: 88, date: "2026-06-18", proctorStatus: "warning" },
]

export default function MyResults() {
  const { data } = useGetStudentResults()
  const results = data?.data || demoResults

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-lg">
            📈
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Results</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your quiz performance history</p>
          </div>
        </div>

        <div className="space-y-4">
          {results.map((r, i) => {
            const passed = r.percentage >= 60
            return (
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
                    <h3 className="font-semibold text-gray-900 dark:text-white">{r.quizTitle}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 dark:text-gray-500">
                      <span>{new Date(r.date).toLocaleDateString()}</span>
                      <span>Score: {r.score}/{r.total}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {r.percentage}%
                    </div>
                    <div className={`text-xs ${r.proctorStatus === "clean" ? "text-green-500" : "text-yellow-500"}`}>
                      {r.proctorStatus === "clean" ? "✅ Passed" : "⚠️ Flagged"}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
