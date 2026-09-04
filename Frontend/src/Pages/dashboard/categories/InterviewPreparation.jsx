import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Star, Briefcase } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const quizzes = [
  { title: "DSA Interview Questions", questions: 40, time: "60 min", difficulty: "Hard", rating: 4.9, enrolled: 5678 },
  { title: "System Design Basics", questions: 20, time: "45 min", difficulty: "Hard", rating: 4.7, enrolled: 3456 },
  { title: "Behavioral Questions", questions: 15, time: "20 min", difficulty: "Easy", rating: 4.2, enrolled: 2345 },
  { title: "HR Interview Prep", questions: 10, time: "15 min", difficulty: "Medium", rating: 4.0, enrolled: 4567 },
  { title: "Technical Communication", questions: 18, time: "25 min", difficulty: "Medium", rating: 4.3, enrolled: 1890 },
  { title: "Problem Solving Patterns", questions: 25, time: "40 min", difficulty: "Hard", rating: 4.8, enrolled: 3123 },
]

export default function InterviewPreparation() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interview Preparation</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ace your next technical interview</p>
        </div>
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search interview prep..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
        </div>
        <div className="grid gap-4">
          {quizzes.filter(q => q.title.toLowerCase().includes(search.toLowerCase())).map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl"><Briefcase size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{q.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span>{q.questions} questions</span><span>{q.time}</span>
                      <span className={`font-medium ${q.difficulty === "Easy" ? "text-emerald-600" : q.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}`}>{q.difficulty}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {q.rating}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => navigate('/student/start-quiz/' + q.title.toLowerCase().replace(/\s+/g, '-'))} className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">Start</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
