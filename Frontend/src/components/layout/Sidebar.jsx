import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/authSlice"
import { signOutUser } from "@/services/firebaseAuth"
import {
  LayoutDashboard, FileText, Radio, BookOpen, Library, ClipboardList,
  BarChart3, Award, Trophy, Target, Bookmark, MessageSquare,
  Settings, User, ChevronDown, ChevronLeft, ChevronRight, LogOut
} from "lucide-react"

const mainMenu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Quizzes", path: "/dashboard/quizzes" },
  { icon: Radio, label: "Live Quizzes", path: "/dashboard/live-quizzes" },
  { icon: BookOpen, label: "Practice", path: "/dashboard/practice" },
  { icon: Library, label: "Question Bank", path: "/dashboard/question-bank" },
  { icon: ClipboardList, label: "My Attempts", path: "/dashboard/my-attempts" },
  { icon: BarChart3, label: "Results", path: "/dashboard/results" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
  { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
  { icon: Target, label: "Achievements", path: "/dashboard/achievements" },
  { icon: Bookmark, label: "Bookmarks", path: "/dashboard/bookmarks" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
]

const categories = [
  { label: "Programming", path: "/dashboard/categories/programming", color: "from-blue-500 to-cyan-500" },
  { label: "Aptitude", path: "/dashboard/categories/aptitude", color: "from-violet-500 to-purple-600" },
  { label: "General Knowledge", path: "/dashboard/categories/general-knowledge", color: "from-emerald-500 to-green-600" },
  { label: "Science", path: "/dashboard/categories/science", color: "from-orange-500 to-red-500" },
  { label: "Mathematics", path: "/dashboard/categories/mathematics", color: "from-pink-500 to-rose-600" },
  { label: "English", path: "/dashboard/categories/english", color: "from-yellow-500 to-amber-600" },
  { label: "Interview Preparation", path: "/dashboard/categories/interview-prep", color: "from-indigo-500 to-violet-600" },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await signOutUser()
    dispatch(logoutUser())
    navigate("/login")
  }
  const [catOpen, setCatOpen] = useState(true)

  const isActive = (path) => location.pathname === path

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 280 }}
        className="fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 dark:border-gray-800">
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              <span>🎓</span> Quiz Genius
            </motion.span>
          )}
          <button onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5 custom-scrollbar">
          {mainMenu.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                  active
                    ? "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/30 text-violet-700 dark:text-violet-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200"
                }`}>
                <div className={`p-1.5 rounded-lg ${active ? "bg-violet-100 dark:bg-violet-900/50" : "group-hover:bg-gray-100 dark:group-hover:bg-gray-800"} transition-colors`}>
                  <Icon size={18} className={active ? "text-violet-600 dark:text-violet-400" : ""} />
                </div>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">{item.label}</motion.span>
                )}
                {active && !collapsed && (
                  <motion.div layoutId="activeTab" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-violet-600 to-blue-600" />
                )}
              </Link>
            )
          })}

          {/* Categories */}
          {!collapsed && (
            <>
              <button onClick={() => setCatOpen(!catOpen)}
                className="flex items-center justify-between w-full px-3 py-2.5 mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {catOpen && categories.map((cat) => {
                  const active = isActive(cat.path)
                  return (
                    <motion.div key={cat.path} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <Link to={cat.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/30 text-violet-700 dark:text-violet-300"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${cat.color}`} />
                        {cat.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </>
          )}
        </nav>

        <div className="border-t border-gray-100 dark:border-gray-800 p-2">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all">
            <div className="p-1.5 rounded-lg"><LogOut size={18} /></div>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setCollapsed(true)} />
      )}
    </>
  )
}
