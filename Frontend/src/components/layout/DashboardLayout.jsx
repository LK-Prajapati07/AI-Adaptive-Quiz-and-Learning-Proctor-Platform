import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Bell, Sun, Moon, LogOut, Menu, ChevronDown, User,
  Settings
} from "lucide-react"
import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "@/store/authSlice"
import { signOutUser } from "@/services/firebaseAuth"

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, role } = useSelector((s) => s.auth)

  const handleLogout = async () => {
    await signOutUser()
    dispatch(logoutUser())
    navigate("/login")
  }

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${dark ? "dark" : ""}`}>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebar(!mobileSidebar)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 lg:hidden transition-colors">
              <Menu size={20} />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-lg">
                🎓
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                Quiz Genius
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search quizzes, topics..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 md:hidden transition-colors">
              <Search size={18} />
            </button>
            <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />
            </button>
            <button onClick={toggleDark}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name || "User"}</span>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-violet-500/5 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name || "User"}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ""}</div>
                      <div className="mt-1.5"><span className="text-xs px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium">{role || "Student"}</span></div>
                    </div>
                    <div className="p-2">
                      {[{ icon: User, label: "Profile", path: "/dashboard/profile" }, { icon: Settings, label: "Settings", path: "/dashboard/settings" }].map((item) => (
                        <button key={item.path} onClick={() => { navigate(item.path); setProfileOpen(false) }}
                          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <item.icon size={16} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 p-2">
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 z-40 md:hidden">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                autoFocus />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex pt-16">
        {/* Mobile sidebar overlay */}
        {mobileSidebar && (
          <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setMobileSidebar(false)} />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-40 pt-16 lg:pt-0 ${mobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300`}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-[72px]" : "lg:ml-[280px]"}`}>
          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
