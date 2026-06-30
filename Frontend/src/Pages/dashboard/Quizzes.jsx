import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Search, Filter, Plus, Clock, CheckCircle, Play, BarChart3, MoreHorizontal, Star, BookOpen } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const allQuizzes = [
  { _id: "d1", title: "JavaScript Fundamentals", category: "Programming", questions: 20, time: "30 min", difficulty: "Medium", status: "Completed", score: "92%", date: "2024-01-15", rating: 4.5 },
  { _id: "d2", title: "React Hooks Deep Dive", category: "Programming", questions: 25, time: "40 min", difficulty: "Hard", status: "In Progress", score: "-", date: "2024-01-20", rating: 4.8 },
  { _id: "d3", title: "Python Data Structures", category: "Programming", questions: 18, time: "25 min", difficulty: "Medium", status: "Upcoming", score: "-", date: "2024-02-01", rating: 4.2 },
  { _id: "d4", title: "Machine Learning Basics", category: "Science", questions: 30, time: "45 min", difficulty: "Hard", status: "Upcoming", score: "-", date: "2024-02-10", rating: 4.6 },
  { _id: "d5", title: "Aptitude Test #1", category: "Aptitude", questions: 15, time: "20 min", difficulty: "Easy", status: "Completed", score: "88%", date: "2024-01-10", rating: 4.0 },
  { _id: "d6", title: "General Knowledge 2024", category: "General Knowledge", questions: 50, time: "60 min", difficulty: "Medium", status: "Completed", score: "76%", date: "2024-01-05", rating: 4.3 },
  { _id: "d7", title: "Calculus Fundamentals", category: "Mathematics", questions: 20, time: "35 min", difficulty: "Hard", status: "In Progress", score: "-", date: "2024-01-18", rating: 4.1 },
  { _id: "d8", title: "English Grammar Pro", category: "English", questions: 25, time: "20 min", difficulty: "Easy", status: "Upcoming", score: "-", date: "2024-02-05", rating: 4.4 },
  { _id: "d9", title: "DSA Interview Prep", category: "Interview Preparation", questions: 40, time: "60 min", difficulty: "Hard", status: "In Progress", score: "-", date: "2024-01-22", rating: 4.9 },
]

const categories = ["All", "Programming", "Aptitude", "General Knowledge", "Science", "Mathematics", "English", "Interview Preparation"]

export default function Quizzes() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filtered = allQuizzes.filter(q => (activeCat === "All" || q.category === activeCat) && q.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Browse and take AI-powered quizzes</p>
          </div>
          <Link to="/dashboard/quizzes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all">
            <Plus size={16} /> Create Quiz
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search quizzes..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30">
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Name</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCat === cat
                  ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map((quiz, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 ${
                    quiz.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                    quiz.status === "In Progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" :
                    "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  }`}>{quiz.status === "Completed" ? "✓" : quiz.status === "In Progress" ? "→" : "○"}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400">{quiz.category}</span>
                      <span>{quiz.questions} Qs</span>
                      <span>{quiz.time}</span>
                      <span className={`font-medium ${quiz.difficulty === "Easy" ? "text-emerald-600" : quiz.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}`}>{quiz.difficulty}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {quiz.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {quiz.score !== "-" && <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{quiz.score}</span>}
                  <button onClick={() => navigate(`/student/start-quiz/${quiz._id}`)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      quiz.status === "Completed"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/30"
                    }`}>
                    {quiz.status === "Completed" ? "Review" : quiz.status === "Upcoming" ? "Start" : "Continue"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
