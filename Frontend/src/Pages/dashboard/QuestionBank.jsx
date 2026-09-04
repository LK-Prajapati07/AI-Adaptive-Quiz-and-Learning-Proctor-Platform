import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Bookmark, BookmarkCheck, ThumbsUp, MessageSquare, Share2, Eye, Clock, BarChart3 } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const questions = [
  { id: 1, question: "What is the output of typeof typeof 42 in JavaScript?", category: "JavaScript", difficulty: "Medium", upvotes: 24, views: 156, bookmarked: true },
  { id: 2, question: "Explain the concept of closures in JavaScript with an example.", category: "JavaScript", difficulty: "Hard", upvotes: 45, views: 320, bookmarked: false },
  { id: 3, question: "What is the difference between let, const, and var?", category: "JavaScript", difficulty: "Easy", upvotes: 67, views: 512, bookmarked: true },
  { id: 4, question: "How does React's Virtual DOM work?", category: "React", difficulty: "Medium", upvotes: 38, views: 289, bookmarked: false },
  { id: 5, question: "Explain the concept of time complexity with Big O notation.", category: "DSA", difficulty: "Hard", upvotes: 52, views: 401, bookmarked: true },
  { id: 6, question: "What is the difference between SQL and NoSQL databases?", category: "Databases", difficulty: "Medium", upvotes: 31, views: 234, bookmarked: false },
  { id: 7, question: "How does event delegation work in JavaScript?", category: "JavaScript", difficulty: "Medium", upvotes: 29, views: 178, bookmarked: false },
  { id: 8, question: "Explain the concept of middleware in Express.js.", category: "Backend", difficulty: "Medium", upvotes: 18, views: 145, bookmarked: true },
]

const categories = ["All", "JavaScript", "React", "DSA", "Databases", "Backend", "Python"]

export default function QuestionBank() {
  const [activeCat, setActiveCat] = useState("All")
  const [search, setSearch] = useState("")
  const [bookmarked, setBookmarked] = useState([])

  const filtered = questions.filter(q => (activeCat === "All" || q.category === activeCat) && q.question.toLowerCase().includes(search.toLowerCase()))

  const toggleBookmark = (id) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question Bank</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Browse, search, and bookmark questions</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Add Question</button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold">Generate with AI</button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCat === cat ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400">{q.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      q.difficulty === "Easy" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" :
                      q.difficulty === "Medium" ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600" : "bg-red-50 dark:bg-red-900/20 text-red-600"
                    }`}>{q.difficulty}</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">{q.question}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Eye size={12} /> {q.views}</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={12} /> {q.upvotes}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {Math.floor(q.upvotes / 3)}</span>
                  </div>
                </div>
                <button onClick={() => toggleBookmark(q.id)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  {(bookmarked.includes(q.id) || q.bookmarked) ? <BookmarkCheck size={18} className="text-violet-600" /> : <Bookmark size={18} className="text-gray-400" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
