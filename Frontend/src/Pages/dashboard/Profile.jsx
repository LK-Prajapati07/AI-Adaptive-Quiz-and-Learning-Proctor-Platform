import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Award, BookOpen, Clock, Target, Trophy, Edit2, Star, Users, Flame } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

export default function Profile() {
  const userData = {
    name: "John Doe", email: "john@example.com", role: "Student", bio: "Lifelong learner passionate about AI and technology. Currently mastering full-stack development.",
    avatar: "JD", color: "from-violet-600 to-blue-600", joinDate: "September 2023", location: "San Francisco, CA",
    stats: [
      { icon: BookOpen, label: "Quizzes Taken", value: "28", color: "from-violet-500 to-purple-600" },
      { icon: Target, label: "Avg. Score", value: "82%", color: "from-blue-500 to-cyan-500" },
      { icon: Flame, label: "Day Streak", value: "12", color: "from-orange-500 to-red-500" },
      { icon: Award, label: "Certificates", value: "4", color: "from-emerald-500 to-green-600" },
      { icon: Trophy, label: "Leaderboard", value: "#4", color: "from-yellow-500 to-amber-600" },
      { icon: Clock, label: "Study Hours", value: "48h", color: "from-pink-500 to-rose-600" },
    ],
    recentAchievements: [
      { name: "Streak Master", desc: "7-day streak", date: "Jan 10" },
      { name: "Quiz Champion", desc: "100% score", date: "Jan 5" },
    ],
    topSkills: [
      { name: "JavaScript", level: 85, color: "from-yellow-500 to-amber-600" },
      { name: "React", level: 75, color: "from-blue-500 to-cyan-600" },
      { name: "Python", level: 65, color: "from-green-500 to-emerald-600" },
      { name: "Data Structures", level: 55, color: "from-violet-500 to-purple-600" },
    ],
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
              <div className="relative inline-block">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${userData.color} flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg`}>
                  {userData.avatar}
                </div>
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  <Edit2 size={14} className="text-violet-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{userData.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{userData.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{userData.role}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{userData.bio}</p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> Joined {userData.joinDate}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {userData.location}</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {userData.stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Star size={20} className="text-yellow-500" /> Top Skills</h3>
                <div className="space-y-4">
                  {userData.topSkills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ delay: i * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Award size={20} className="text-violet-600" /> Recent Achievements</h3>
                <div className="space-y-3">
                  {userData.recentAchievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/20">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                        <Award size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{ach.name}</div>
                        <div className="text-xs text-gray-500">{ach.desc} · {ach.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
