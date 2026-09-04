import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetQuizzes } from "@/customHook/quiz.hook"

const demoQuizzes = [
  { _id: "1", title: "JavaScript Fundamentals", description: "Test your JS knowledge", duration: 30, totalQuestions: 10, difficulty: "medium", createdAt: "2 days ago" },
  { _id: "2", title: "React Hooks Deep Dive", description: "Advanced React patterns", duration: 45, totalQuestions: 15, difficulty: "hard", createdAt: "5 days ago" },
  { _id: "3", title: "Python for Data Science", description: "NumPy, Pandas basics", duration: 20, totalQuestions: 8, difficulty: "easy", createdAt: "1 week ago" },
]

export default function QuizList() {
  const { data, isLoading } = useGetQuizzes()
  const quizzes = data?.data || demoQuizzes

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-lg">
              📋
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz List</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your quizzes</p>
            </div>
          </div>
          <Link
            to="/trainer/create-quiz"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-all"
          >
            + New Quiz
          </Link>
        </div>

        <div className="grid gap-4">
          {quizzes.map((quiz, i) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{quiz.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>⏱ {quiz.duration} min</span>
                    <span>📄 {quiz.totalQuestions} questions</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      quiz.difficulty === "easy" ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" :
                      quiz.difficulty === "hard" ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
                      "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/trainer/generate-questions?quizId=${quiz._id}`}
                    className="px-4 py-2 text-sm rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    Generate AI
                  </Link>
                  <Link
                    to={`/trainer/view-questions?quizId=${quiz._id}`}
                    className="px-4 py-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
