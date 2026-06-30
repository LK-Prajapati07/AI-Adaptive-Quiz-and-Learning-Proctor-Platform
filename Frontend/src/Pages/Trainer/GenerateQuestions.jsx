import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useGenerateAIQuestions } from "@/customHook/quiz.hook"

export default function GenerateQuestions() {
  const [searchParams] = useSearchParams()
  const quizId = searchParams.get("quizId") || "1"
  const [file, setFile] = useState(null)
  const [topic, setTopic] = useState("")
  const [count, setCount] = useState(5)
  const fileRef = useRef()
  const { mutateAsync, isPending, data: result } = useGenerateAIQuestions()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (file) formData.append("file", file)
    formData.append("topic", topic)
    formData.append("count", count)
    formData.append("quizId", quizId)
    await mutateAsync(formData)
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Question Generator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Upload a PDF or enter a topic to generate questions</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload PDF</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  {file ? (
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      📄 {file.name}
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-sm">Click to upload PDF</p>
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Topic (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. JavaScript closures"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Number of Questions</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isPending || (!file && !topic)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 disabled:opacity-60 transition-all"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Questions with AI"
              )}
            </motion.button>
          </form>
        </motion.div>

        {result?.data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-4">
              <span className="text-2xl">✅</span>
              {result.data.length} Questions Generated
            </div>
            <div className="space-y-3">
              {result.data.map((q, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-green-100 dark:border-green-900/30">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {i + 1}. {q.question}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.options?.map((opt, oi) => (
                      <span key={oi} className={`px-3 py-1 rounded-lg text-xs ${
                        opt === q.correctAnswer
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}>
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
