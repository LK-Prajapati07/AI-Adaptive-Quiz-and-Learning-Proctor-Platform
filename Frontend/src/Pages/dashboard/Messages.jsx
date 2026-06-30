import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Search, Send, Phone, Video, MoreHorizontal, CheckCheck, Clock } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"

const conversations = [
  { id: 1, name: "Sarah Johnson", avatar: "S", color: "from-violet-500 to-purple-600", lastMsg: "Great job on the JavaScript quiz!", time: "2 min ago", unread: 2, online: true },
  { id: 2, name: "Alex Martinez", avatar: "A", color: "from-blue-500 to-cyan-500", lastMsg: "Can you help me with React hooks?", time: "15 min ago", unread: 0, online: true },
  { id: 3, name: "Prof. Chen", avatar: "C", color: "from-emerald-500 to-green-600", lastMsg: "Your certificate is ready for download", time: "1 hour ago", unread: 1, online: false },
  { id: 4, name: "Study Group A", avatar: "SG", color: "from-orange-500 to-red-500", lastMsg: "Meeting tomorrow at 5 PM", time: "3 hours ago", unread: 0, online: false },
  { id: 5, name: "Quiz Genius Bot", avatar: "AI", color: "from-cyan-500 to-teal-600", lastMsg: "New personalized recommendations ready", time: "5 hours ago", unread: 0, online: true },
]

const messages = [
  { id: 1, text: "Hi! Great job on the JavaScript quiz!", sender: "them", time: "10:30 AM" },
  { id: 2, text: "Thanks! I've been practicing a lot.", sender: "me", time: "10:32 AM" },
  { id: 3, text: "Would you like to join the React study group?", sender: "them", time: "10:33 AM" },
  { id: 4, text: "Sure, that sounds great! When is the next session?", sender: "me", time: "10:35 AM" },
  { id: 5, text: "Tomorrow at 5 PM. I'll send you the invite.", sender: "them", time: "10:36 AM" },
]

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1)
  const [msgText, setMsgText] = useState("")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-65px)]">
              {conversations.map((conv, i) => (
                <motion.div key={conv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  onClick={() => setActiveChat(conv.id)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-gray-50 dark:border-gray-800/50 ${
                    activeChat === conv.id ? "bg-violet-50 dark:bg-violet-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  }`}>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${conv.color} flex items-center justify-center text-white text-xs font-bold`}>{conv.avatar}</div>
                    {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{conv.name}</h4>
                      <span className="text-[10px] text-gray-400 shrink-0">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{conv.lastMsg}</span>
                      {conv.unread > 0 && <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{conv.unread}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">S</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Sarah Johnson</h3>
                  <span className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"><Phone size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"><Video size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"><MoreHorizontal size={16} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] p-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : ""}`}>
                      <span className={`text-[10px] ${msg.sender === "me" ? "text-white/70" : "text-gray-400"}`}>{msg.time}</span>
                      {msg.sender === "me" && <CheckCheck size={12} className="text-white/70" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Type a message..." value={msgText} onChange={e => setMsgText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
                <button className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
