import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Shield, Eye, Globe, Moon, Sun, Volume2, Smartphone, Key, User, Mail, Save } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

export default function Settings() {
  const [dark, setDark] = useState(false)
  const [notifications, setNotifications] = useState({ email: true, push: true, quiz: false, marketing: false })
  const [profile, setProfile] = useState({ name: "John Doe", email: "john@example.com", bio: "Lifelong learner passionate about AI and technology." })

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account preferences</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
            <Save size={16} /> Save Changes
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5"><User size={20} className="text-violet-600" /> Profile</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                  <textarea rows={3} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5"><Bell size={20} className="text-violet-600" /> Notifications</h2>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "push", label: "Push Notifications", desc: "Receive push notifications" },
                  { key: "quiz", label: "Quiz Reminders", desc: "Get reminded about upcoming quizzes" },
                  { key: "marketing", label: "Marketing Emails", desc: "Receive promotional offers" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <button onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                      className={`w-11 h-6 rounded-full transition-all duration-300 ${notifications[item.key] ? "bg-gradient-to-r from-violet-600 to-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${notifications[item.key] ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5"><Eye size={20} className="text-violet-600" /> Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    {dark ? <Moon size={18} className="text-violet-600" /> : <Sun size={18} className="text-yellow-500" />}
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                  </div>
                  <button onClick={toggleDark}
                    className={`w-11 h-6 rounded-full transition-all duration-300 ${dark ? "bg-gradient-to-r from-violet-600 to-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${dark ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-5"><Shield size={20} className="text-violet-600" /> Security</h2>
              <div className="space-y-3">
                <button className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <span className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"><Key size={16} /> Change Password</span>
                  <span className="text-xs text-violet-600">Update</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <span className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"><Smartphone size={16} /> Two-Factor Auth</span>
                  <span className="text-xs text-violet-600">Enable</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <span className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"><Globe size={16} /> Privacy Settings</span>
                  <span className="text-xs text-violet-600">Manage</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
