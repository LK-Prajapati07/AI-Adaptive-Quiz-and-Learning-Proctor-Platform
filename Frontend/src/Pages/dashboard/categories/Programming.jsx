import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, BookOpen, Star, Clock, Filter, ArrowRight } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const quizzes = [
  { title: "JavaScript Fundamentals", questions: 20, time: "30 min", difficulty: "Medium", rating: 4.5, enrolled: 1256 },
  { title: "React Hooks Deep Dive", questions: 25, time: "40 min", difficulty: "Hard", rating: 4.8, enrolled: 892 },
  { title: "Python Data Structures", questions: 18, time: "25 min", difficulty: "Medium", rating: 4.2, enrolled: 1567 },
  { title: "TypeScript Basics", questions: 15, time: "20 min", difficulty: "Easy", rating: 4.0, enrolled: 678 },
  { title: "Node.js API Development", questions: 30, time: "45 min", difficulty: "Hard", rating: 4.6, enrolled: 445 },
]

export default function Programming() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Programming</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Master coding skills with AI-powered quizzes</p>
        </div>
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search programming quizzes..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
        </div>
        <div className="grid gap-4">
          {quizzes.filter(q => q.title.toLowerCase().includes(search.toLowerCase())).map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">&lt;/&gt;</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{q.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span>{q.questions} questions</span><span>{q.time}</span>
                      <span className={`font-medium ${q.difficulty === "Easy" ? "text-emerald-600" : q.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}`}>{q.difficulty}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {q.rating}</span>
                      <span>{q.enrolled.toLocaleString()} enrolled</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => navigate('/student/start-quiz/' + q.title.toLowerCase().replace(/\s+/g, '-'))} className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">Start Quiz</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
