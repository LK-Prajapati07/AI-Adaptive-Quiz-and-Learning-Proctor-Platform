import { useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Search, Trash2, ExternalLink, FolderOpen, Clock } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const bookmarks = [
  { id: 1, title: "JavaScript Closures Explained", type: "Question", category: "JavaScript", date: "Jan 15, 2024", tags: ["closures", "scope"] },
  { id: 2, title: "React Component Lifecycle", type: "Article", category: "React", date: "Jan 14, 2024", tags: ["react", "lifecycle"] },
  { id: 3, title: "SQL JOIN Operations", type: "Question", category: "Databases", date: "Jan 12, 2024", tags: ["sql", "joins"] },
  { id: 4, title: "Time Complexity Cheatsheet", type: "Resource", category: "DSA", date: "Jan 10, 2024", tags: ["algorithms", "big-o"] },
  { id: 5, title: "Python List Comprehensions", type: "Question", category: "Python", date: "Jan 8, 2024", tags: ["python", "comprehensions"] },
  { id: 6, title: "CSS Grid Layout Guide", type: "Article", category: "Frontend", date: "Jan 5, 2024", tags: ["css", "grid"] },
]

export default function Bookmarks() {
  const [search, setSearch] = useState("")

  const filtered = bookmarks.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookmarks</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your saved questions and resources</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search bookmarks..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-700/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                    <Bookmark size={18} className="text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{b.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600">{b.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">{b.type}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {b.date}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {b.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"><ExternalLink size={16} /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
