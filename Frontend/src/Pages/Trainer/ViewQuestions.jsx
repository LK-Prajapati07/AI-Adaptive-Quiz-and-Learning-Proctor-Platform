import { motion } from "framer-motion"
import { useSearchParams } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGetQuestions } from "@/customHook/quiz.hook"

const demoQuestions = [
  { _id: "q1", question: "What is a closure in JavaScript?", options: ["A function with its lexical scope", "A closed block of code", "A type of loop", "An error handler"], correctAnswer: "A function with its lexical scope" },
  { _id: "q2", question: "What does the `useState` hook return?", options: ["A variable and a setter", "An object", "An array of two values", "A promise"], correctAnswer: "An array of two values" },
  { _id: "q3", question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" },
]

export default function ViewQuestions() {
  const [searchParams] = useSearchParams()
  const quizId = searchParams.get("quizId") || "1"
  const { data, isLoading } = useGetQuestions(quizId)
  const questions = data?.data || demoQuestions

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg">
            👁️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">View Questions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{questions.length} questions in this quiz</p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <motion.div
              key={q._id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-semibold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{q.question}</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options?.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`px-4 py-2.5 rounded-xl text-sm border ${
                          opt === q.correctAnswer
                            ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                        {opt}
                        {opt === q.correctAnswer && <span className="ml-2 text-xs">✓ Correct</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
