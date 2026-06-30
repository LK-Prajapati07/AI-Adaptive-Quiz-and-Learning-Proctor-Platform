import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetAvailableQuizzes } from "@/customHook/quiz.hook"

const demoQuizzes = [
  { _id: "1", title: "JavaScript Fundamentals", description: "Test your JS knowledge", duration: 30, totalQuestions: 10, difficulty: "medium" },
  { _id: "2", title: "React Hooks Deep Dive", description: "Advanced React patterns", duration: 45, totalQuestions: 15, difficulty: "hard" },
  { _id: "3", title: "Python for Data Science", description: "NumPy, Pandas basics", duration: 20, totalQuestions: 8, difficulty: "easy" },
]

export default function AvailableQuizzes() {
  const { data, isLoading } = useGetAvailableQuizzes()
  const quizzes = data?.data || demoQuizzes

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-lg">
            📚
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Quizzes</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pick a quiz and test your knowledge</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz, i) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col"
            >
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg mb-3">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{quiz.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>⏱ {quiz.duration} min</span>
                  <span>📄 {quiz.totalQuestions} Qs</span>
                </div>
              </div>
              <Link
                to={`/student/start-quiz/${quiz._id}`}
                className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium text-center hover:opacity-90 transition-all"
              >
                Start Quiz
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
