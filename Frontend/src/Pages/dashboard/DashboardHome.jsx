import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Sparkles, Play, Plus, Clock, CheckCircle, TrendingUp, Zap,
  Trophy, Target, BookOpen, Medal, Star, ArrowRight, Flame,
  Timer, Users, Crown, Layers, Brain, BarChart3, Gift, Shield,
  Activity, Award, Radio
} from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const statsData = [
  { icon: BookOpen, label: "Quizzes Attempted", value: "24", color: "from-violet-500 to-purple-600", change: "+3 this week" },
  { icon: Target, label: "Accuracy", value: "87%", color: "from-blue-500 to-cyan-500", change: "+5% improvement" },
  { icon: Flame, label: "Learning Streak", value: "12 days", color: "from-orange-500 to-red-500", change: "Best: 15 days" },
  { icon: Award, label: "Certificates", value: "4", color: "from-emerald-500 to-green-600", change: "+1 this month" },
  { icon: Clock, label: "Study Time", value: "48h", color: "from-pink-500 to-rose-600", change: "12h this week" },
  { icon: Trophy, label: "Rank", value: "#12", color: "from-yellow-500 to-amber-600", change: "Top 5%" },
]

const quizzesData = [
  { title: "JavaScript Fundamentals", progress: 75, status: "In Progress", questions: 15, time: "20 min" },
  { title: "React Hooks Deep Dive", progress: 100, status: "Completed", questions: 20, time: "35 min", score: "92%" },
  { title: "Python Data Structures", progress: 30, status: "In Progress", questions: 18, time: "25 min" },
  { title: "Machine Learning Basics", progress: 0, status: "Upcoming", questions: 25, time: "40 min" },
]

const tabs = ["All", "In Progress", "Completed", "Upcoming"]

const leaderboardData = [
  { name: "Sarah J.", score: 9842, avatar: "S", color: "from-violet-500 to-purple-600", badge: "🥇" },
  { name: "Alex M.", score: 9651, avatar: "A", color: "from-blue-500 to-cyan-500", badge: "🥈" },
  { name: "Priya K.", score: 9420, avatar: "P", color: "from-emerald-500 to-green-600", badge: "🥉" },
  { name: "You", score: 8912, avatar: "Y", color: "from-orange-500 to-red-500", badge: "#4", isUser: true },
  { name: "John D.", score: 8745, avatar: "J", color: "from-pink-500 to-rose-600", badge: "#5" },
]

const activityData = [
  { action: "Completed Quiz", detail: "JavaScript Fundamentals - 92%", time: "2 hours ago", icon: CheckCircle, color: "from-emerald-500 to-green-600" },
  { action: "Certificate Earned", detail: "React Development Mastery", time: "Yesterday", icon: Award, color: "from-violet-500 to-purple-600" },
  { action: "Achievement Unlocked", detail: "Streak Master - 7 day streak", time: "2 days ago", icon: Target, color: "from-orange-500 to-red-500" },
  { action: "Quiz Attempted", detail: "Python Data Structures - 78%", time: "3 days ago", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
]

const recommendationsData = [
  { title: "Advanced JavaScript", desc: "Master closures, promises, and async patterns", difficulty: "Hard", match: "95% match" },
  { title: "Data Structures & Algorithms", desc: "Strengthen your problem-solving skills", difficulty: "Medium", match: "88% match" },
  { title: "System Design Basics", desc: "Learn scalable architecture patterns", difficulty: "Medium", match: "82% match" },
]

const badgesData = [
  { name: "Streak Master", icon: Flame, desc: "7-day learning streak", earned: true, color: "from-orange-500 to-red-500" },
  { name: "Quiz Champion", icon: Trophy, desc: "Score 100% on any quiz", earned: true, color: "from-yellow-500 to-amber-600" },
  { name: "Fast Learner", icon: Zap, desc: "Complete 5 quizzes in a day", earned: false, color: "from-blue-500 to-cyan-500" },
  { name: "Top Performer", icon: Crown, desc: "Reach top 10 on leaderboard", earned: false, color: "from-violet-500 to-purple-600" },
]

const liveQuizzesData = [
  { title: "Weekly Coding Challenge", participants: 156, timeLeft: "12:45", prize: "500 pts" },
  { title: "Aptitude Speed Test", participants: 89, timeLeft: "08:30", prize: "300 pts" },
]

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState("All")
  const { user } = useSelector((s) => s.auth)

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-indigo-700 p-8 lg:p-12 mb-8 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-medium mb-4">
                <Sparkles size={12} /> AI-Powered Learning
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Master Any Subject with <span className="text-yellow-300">AI Adaptive Quizzes</span>
              </h1>
              <p className="mt-3 text-white/70 text-base sm:text-lg max-w-md">
                Personalized learning paths powered by AI. Track progress, earn certificates, and compete with peers.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link to="/dashboard/practice"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-violet-700 font-semibold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <Play size={16} /> Start Practice
                </Link>
                <Link to="/dashboard/quizzes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/15 text-white font-semibold text-sm border border-white/20 hover:bg-white/25 transition-all">
                  <Plus size={16} /> Create Quiz
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-white/10 rounded-[40px] rotate-12 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-white/5 rounded-[40px] -rotate-6 backdrop-blur-sm" />
                <div className="absolute inset-4 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <Brain size={64} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statsData.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-violet-500/5 hover:border-violet-200 dark:hover:border-violet-700/30 transition-all overflow-hidden group">
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <stat.icon size={16} className="text-white" />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
                <div className="text-[10px] text-violet-500 dark:text-violet-400 mt-1 font-medium">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* My Quizzes + Live Quizzes row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* My Quizzes */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen size={20} className="text-violet-600" /> My Quizzes
                </h2>
                <Link to="/dashboard/quizzes" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">View all</Link>
              </div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {quizzesData.map((q, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                        q.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                        q.status === "In Progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" :
                        "bg-gray-100 dark:bg-gray-700 text-gray-400"
                      }`}>
                        {q.status === "Completed" ? "✓" : q.status === "In Progress" ? "→" : "○"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{q.title}</h4>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400">{q.questions} questions</span>
                          <span className="text-xs text-gray-400">{q.time}</span>
                          {q.score && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{q.score}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block w-20">
                        <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            q.progress === 100 ? "bg-emerald-500" : "bg-violet-500"
                          }`} style={{ width: `${q.progress}%` }} />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 text-right">{q.progress}%</div>
                      </div>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium opacity-0 group-hover:opacity-100 transition-all">
                        {q.status === "Completed" ? "Review" : q.status === "Upcoming" ? "Start" : "Continue"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Quizzes */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
                <Radio size={20} className="text-violet-600" /> Live Quizzes
              </h2>
              <div className="space-y-4">
                {liveQuizzesData.map((lq, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-100 dark:border-violet-800/30">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{lq.title}</h4>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse">LIVE</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Users size={12} /> {lq.participants}</span>
                      <span className="flex items-center gap-1"><Timer size={12} /> {lq.timeLeft}</span>
                      <span className="flex items-center gap-1"><Award size={12} /> {lq.prize}</span>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                      Join Now
                    </button>
                  </motion.div>
                ))}
                <Link to="/dashboard/live-quizzes" className="block text-center text-xs text-violet-600 dark:text-violet-400 hover:underline py-2">
                  View all live quizzes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard + Recent Activity + AI Recommendations row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Leaderboard */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
                <Trophy size={20} className="text-yellow-500" /> Leaderboard
              </h2>
              <div className="space-y-2">
                {leaderboardData.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      item.isUser
                        ? "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/30 border border-violet-200 dark:border-violet-700/30"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}>
                    <span className="w-7 text-center text-sm font-bold text-gray-400">{item.badge}</span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {item.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.score.toLocaleString()} pts</div>
                    </div>
                    {item.isUser && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium">You</span>}
                  </motion.div>
                ))}
              </div>
              <Link to="/dashboard/leaderboard" className="block text-center text-sm text-violet-600 dark:text-violet-400 hover:underline mt-4">
                View full leaderboard →
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
                <Activity size={20} className="text-violet-600" /> Recent Activity
              </h2>
              <div className="space-y-4">
                {activityData.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{item.time}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
                <Sparkles size={20} className="text-yellow-500" /> AI Recommendations
              </h2>
              <div className="space-y-3">
                {recommendationsData.map((rec, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/20 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{rec.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{rec.match}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{rec.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        rec.difficulty === "Hard" ? "bg-red-50 dark:bg-red-900/20 text-red-600" : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600"
                      }`}>{rec.difficulty}</span>
                      <span className="text-xs text-violet-600 dark:text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-all">Start →</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/dashboard/practice" className="block text-center text-sm text-violet-600 dark:text-violet-400 hover:underline mt-4">
                View personalized path →
              </Link>
            </div>
          </div>
        </div>

        {/* Achievements + Premium row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Target size={20} className="text-violet-600" /> Achievement Badges
                </h2>
                <Link to="/dashboard/achievements" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">View all</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {badgesData.map((badge, i) => {
                  const Icon = badge.icon
                  return (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-xl text-center transition-all ${
                        badge.earned
                          ? "bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-200 dark:border-violet-700/30"
                          : "bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30 opacity-50"
                      }`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-2 ${!badge.earned && "grayscale"}`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">{badge.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{badge.desc}</div>
                      {badge.earned && <div className="text-[10px] text-emerald-600 mt-1">✓ Earned</div>}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Premium */}
          <div>
            <div className="relative rounded-2xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 p-6 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Crown size={24} className="text-yellow-300" />
                  <h3 className="text-xl font-bold text-white">Upgrade to Premium</h3>
                </div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Unlimited AI-generated quizzes",
                    "Advanced analytics & insights",
                    "Priority support & mentorship",
                    "Custom learning paths",
                    "Ad-free experience",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                      <Shield size={14} className="text-yellow-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-2xl bg-white text-violet-700 font-semibold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                  Upgrade Now - $9.99/mo
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
