import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"

const trainerData = {
  stats: [
    { label: "Total Quizzes", value: "12", icon: "📝", color: "from-blue-500 to-cyan-500" },
    { label: "Active Students", value: "48", icon: "👥", color: "from-green-500 to-emerald-500" },
    { label: "Avg Score", value: "78%", icon: "📊", color: "from-orange-500 to-red-500" },
    { label: "AI Generated", value: "156", icon: "🤖", color: "from-purple-500 to-pink-500" },
  ],
  quickActions: [
    { icon: "📝", label: "Create Quiz", path: "/trainer/create-quiz" },
    { icon: "🤖", label: "Generate AI Questions", path: "/trainer/generate-questions" },
    { icon: "📋", label: "View All Quizzes", path: "/trainer/quiz-list" },
  ],
  recent: [
    { title: "JavaScript Fundamentals", status: "Active", students: 12 },
    { title: "React Hooks Deep Dive", status: "Draft", students: 0 },
    { title: "Python for Data Science", status: "Active", students: 8 },
  ],
}

const studentData = {
  stats: [
    { label: "Quizzes Taken", value: "12", icon: "📝", color: "from-blue-500 to-cyan-500" },
    { label: "Avg. Score", value: "85%", icon: "📊", color: "from-green-500 to-emerald-500" },
    { label: "Streak", value: "7 days", icon: "🔥", color: "from-orange-500 to-red-500" },
    { label: "Badges", value: "4", icon: "🏆", color: "from-yellow-500 to-orange-500" },
  ],
  quickActions: [
    { icon: "📚", label: "Available Quizzes", path: "/student/quizzes" },
    { icon: "📈", label: "My Results", path: "/student/results" },
  ],
  recent: [
    { title: "JavaScript Fundamentals", score: "92%", date: "2 days ago" },
    { title: "React Hooks Deep Dive", score: "78%", date: "5 days ago" },
    { title: "Python for Data Science", score: "88%", date: "1 week ago" },
  ],
}

const recruiterData = {
  stats: [
    { label: "Total Candidates", value: "24", icon: "👥", color: "from-blue-500 to-cyan-500" },
    { label: "Pass Rate", value: "72%", icon: "📊", color: "from-green-500 to-emerald-500" },
    { label: "Flagged", value: "3", icon: "⚠️", color: "from-orange-500 to-red-500" },
    { label: "Reports", value: "8", icon: "📋", color: "from-purple-500 to-pink-500" },
  ],
  quickActions: [
    { icon: "👥", label: "Candidate Reports", path: "/recruiter/candidates" },
    { icon: "🛡️", label: "Proctor Reports", path: "/recruiter/proctor" },
  ],
  recent: [
    { name: "Alice Smith", quiz: "JavaScript", score: "92%", risk: "Low" },
    { name: "Bob Johnson", quiz: "React Hooks", score: "65%", risk: "Medium" },
    { name: "David Brown", quiz: "DSA", score: "45%", risk: "High" },
  ],
}

export default function Dashboard() {
  const { user, role } = useSelector((s) => s.auth)
  const displayName = user?.name || "Learner"

  const data = role === "Trainer" ? trainerData : role === "Recruiter" ? recruiterData : studentData

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {displayName} 👋
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {role || "Student"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3`}>
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="space-y-4">
            {data.quickActions.map((action, i) => (
              <Link
                key={i}
                to={action.path}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="text-xl">{action.icon}</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {role === "Recruiter" ? "Recent Candidates" : "Recent Activity"}
              </h2>
              <div className="space-y-3">
                {role === "Recruiter"
                  ? recruiterData.recent.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.quiz} - {item.score}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.risk === "Low" ? "bg-green-50 dark:bg-green-900/30 text-green-600" :
                          item.risk === "High" ? "bg-red-50 dark:bg-red-900/30 text-red-600" :
                          "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600"
                        }`}>
                          {item.risk} Risk
                        </span>
                      </motion.div>
                    ))
                  : data.recent.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.score ? `${item.score} - ${item.date}` : `${item.students} students`}</div>
                        </div>
                        <span className={`text-xs font-medium ${item.score ? (parseInt(item.score) >= 80 ? "text-green-600" : "text-yellow-600") : (item.status === "Active" ? "text-green-600" : "text-gray-400")}`}>
                          {item.score || item.status}
                        </span>
                      </motion.div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
