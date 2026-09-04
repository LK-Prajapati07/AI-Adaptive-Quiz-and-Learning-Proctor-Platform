import { useState } from "react"
import { motion } from "framer-motion"
import { useLocation, useParams, Link } from "react-router-dom"
import { Award, Download, Loader2 } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useSelector } from "react-redux"
import { jsPDF } from "jspdf"
import { toast } from "sonner"

function generateCertPDF(correct, total, score, quizName, user) {
  const pdf = new jsPDF("l", "mm", "a4")
  const w = 297, h = 210
  const name = (user?.name || "User").replace(/\s+/g, "_")
  const quiz = quizName.replace(/\s+/g, "_")
  const id = `CERT-${String(Date.now()).slice(-4)}-${new Date().getFullYear()}`

  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, w, h, "F")
  pdf.setDrawColor(139, 92, 246)
  pdf.setLineWidth(0.6)
  pdf.rect(8, 8, w - 16, h - 16, "S")
  pdf.setDrawColor(200, 190, 240)
  pdf.setLineWidth(0.3)
  pdf.rect(12, 12, w - 24, h - 24, "S")

  pdf.setFontSize(30)
  pdf.text("🎓", w / 2, 30, { align: "center" })
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(18)
  pdf.setTextColor(124, 58, 237)
  pdf.text("QUIZ", w / 2 - 21, 46, { align: "right" })
  pdf.setTextColor(59, 130, 246)
  pdf.text("GENIUS", w / 2 + 5, 46, { align: "left" })

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(160, 160, 170)
  pdf.text("CERTIFICATE OF ACHIEVEMENT", w / 2, 58, { align: "center" })
  pdf.setDrawColor(139, 92, 246)
  pdf.setLineWidth(0.4)
  pdf.line(w / 2 - 25, 61, w / 2 + 25, 61)

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.setTextColor(160, 160, 170)
  pdf.text("PRESENTED TO", w / 2, 78, { align: "center" })
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(34)
  pdf.setTextColor(30, 30, 35)
  pdf.text(user?.name || "User", w / 2, 95, { align: "center" })

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 110)
  pdf.text(pdf.splitTextToSize(`For successfully completing the quiz on "${quizName}" with outstanding performance and demonstrating strong subject knowledge.`, w - 120), w / 2, 115, { align: "center" })

  pdf.setDrawColor(220, 220, 230)
  pdf.setLineWidth(0.2)
  pdf.line(60, 135, w - 60, 135)

  const cols = [
    { label: "SCORE", value: `${correct}/${total}`, size: 18, color: [30, 30, 35] },
    { label: "PERCENTAGE", value: `${score}%`, size: 18, color: [124, 58, 237] },
    { label: "DATE", value: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), size: 10, color: [30, 30, 35] },
  ]
  const gap = 65
  const startX = (w - cols.length * gap) / 2
  cols.forEach((col, i) => {
    const x = startX + i * gap + gap / 2
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.setTextColor(160, 160, 170)
    pdf.text(col.label, x, 142, { align: "center" })
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(col.size)
    pdf.setTextColor(col.color[0], col.color[1], col.color[2])
    pdf.text(col.value, x, 154, { align: "center" })
  })

  pdf.setDrawColor(200, 200, 200)
  pdf.setLineWidth(0.3)
  pdf.line(40, h - 40, 90, h - 40)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(7)
  pdf.setTextColor(160, 160, 170)
  pdf.text("AUTHORIZED SIGNATURE", 65, h - 36, { align: "center" })
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(9)
  pdf.setTextColor(70, 70, 80)
  pdf.text("Quiz Genius Team", 65, h - 28, { align: "center" })

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(7)
  pdf.setTextColor(200, 200, 200)
  pdf.text(id, w / 2, h - 10, { align: "center" })

  pdf.save(`Certificate_${quiz}_${name}.pdf`)
}

export default function Result() {
  const { attemptId } = useParams()
  const location = useLocation()
  const state = location.state || {}
  const { answers = [], total = 10, proctorWarnings = 0, proctorStatus = "clean" } = state
  const { user } = useSelector((s) => s.auth)
  const [downloading, setDownloading] = useState(false)

  const correct = answers.length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = score >= 60 && proctorStatus !== "disqualified"
  const quizName = state?.quizTitle || "Quiz"

  const downloadCertPDF = () => {
    setDownloading(true)
    try {
      generateCertPDF(correct, total, score, quizName, user)
      toast.success("Certificate downloaded!")
    } catch {
      toast.error("Failed to generate certificate")
    } finally {
      setDownloading(false)
    }
  }

  const getMessage = () => {
    if (score >= 80) return { emoji: "🏆", title: "Excellent!", msg: "Outstanding performance! You have a strong grasp of the material.", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30" }
    if (score >= 60) return { emoji: "👍", title: "Good Job!", msg: "Solid effort! Review the topics you missed to improve further.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30" }
    return { emoji: "📚", title: "Keep Practicing!", msg: "Don't give up! Review the fundamentals and try again.", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30" }
  }

  const message = getMessage()
  const ringColor = score >= 80 ? "stroke-green-500" : score >= 60 ? "stroke-blue-500" : "stroke-yellow-500"

  // compute score ring
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Result</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Attempt ID: {attemptId?.slice(0, 12)}...</p>
        </div>

        {/* Score ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="10" />
              <motion.circle
                cx="80" cy="80" r={radius}
                fill="none"
                className={ringColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{score}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{correct}/{total} correct</span>
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`p-6 rounded-2xl border ${message.bg} mb-6 text-center`}
        >
          <div className="text-5xl mb-3">{message.emoji}</div>
          <h2 className={`text-xl font-bold ${message.color}`}>{message.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{message.msg}</p>
        </motion.div>

        {/* AI Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Feedback</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{message.msg} Based on your performance, we recommend focusing on practice and reviewing core concepts regularly.</p>
        </motion.div>

        {/* Proctor Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🛡️</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">Proctor Status</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              proctorStatus === "clean" ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" :
              proctorStatus === "disqualified" ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
              "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
            }`}>
              {proctorStatus === "clean" ? "✅ Clean" : proctorStatus === "disqualified" ? "❌ Disqualified" : "⚠️ Review Needed"}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{proctorWarnings} warning(s)</span>
          </div>
        </motion.div>

        {/* Certificate */}
        {passed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-violet-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Your Certificate</h3>
            </div>
            <div className="bg-white rounded-2xl border-2 border-violet-200/50 overflow-hidden p-6">
              <div className="text-center">
                <div className="text-3xl mb-1">🎓</div>
                <div className="text-lg font-bold">
                  <span className="text-violet-600">Quiz</span>
                  <span className="text-blue-600">Genius</span>
                </div>
                <div className="text-[10px] uppercase tracking-[4px] text-gray-400 font-medium mt-2">Certificate of Achievement</div>
                <div className="w-20 h-[2px] mx-auto mt-2 bg-gradient-to-r from-violet-600 to-blue-600" />
              </div>
              <div className="text-center mt-5">
                <div className="text-[9px] text-gray-400 uppercase tracking-[2px]">Presented To</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{user?.name || "User"}</div>
              </div>
              <div className="text-center mt-4 px-4">
                <p className="text-xs text-gray-500 leading-relaxed">For successfully completing the quiz with outstanding performance and demonstrating strong subject knowledge.</p>
              </div>
              <div className="flex justify-center gap-10 mt-5 pt-4 border-t border-gray-100">
                <div className="text-center"><div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Score</div><div className="text-lg font-bold text-gray-900">{correct}/{total}</div></div>
                <div className="text-center"><div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Percentage</div><div className="text-lg font-bold text-violet-600">{score}%</div></div>
                <div className="text-center"><div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Date</div><div className="text-sm font-semibold text-gray-700">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div></div>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-end">
                <div className="text-center"><div className="w-24 h-[1px] bg-gray-300 mb-1" /><div className="text-[7px] text-gray-400 uppercase tracking-[1px]">Authorized Signature</div><div className="text-[9px] font-semibold text-gray-700 mt-0.5">Quiz Genius Team</div></div>
                <div className="text-center"><span className="text-[7px] text-gray-300 font-mono">CERT-{String(Date.now()).slice(-4)}-{new Date().getFullYear()}</span></div>
              </div>
            </div>
            <button onClick={downloadCertPDF} disabled={downloading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-60 transition-all">
              {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {downloading ? "Generating PDF..." : "Download Certificate"}
            </button>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-4 justify-center"
        >
          <Link to="/student/quizzes" className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all">
            Try Another Quiz
          </Link>
          <Link to="/dashboard" className="px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
