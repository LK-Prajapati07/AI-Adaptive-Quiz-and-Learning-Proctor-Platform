import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Download, Star, CheckCircle, Lock, AlertCircle, Loader2 } from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useSelector } from "react-redux"
import { jsPDF } from "jspdf"
import { toast } from "sonner"
import { useGetStudentResults } from "@/customHook/quiz.hook"

const PASS_PERCENTAGE = 60

function generateCertPDF(result, user, id) {
  const pdf = new jsPDF("l", "mm", "a4")
  const w = 297
  const h = 210
  const certId = `CERT-${String(id).padStart(4, "0")}-${new Date(result.date).getFullYear()}`
  const name = (user?.name || "User").replace(/\s+/g, "_")
  const quiz = result.quizTitle.replace(/\s+/g, "_")

  // white background + clean border
  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, w, h, "F")
  pdf.setDrawColor(139, 92, 246)
  pdf.setLineWidth(0.6)
  pdf.rect(8, 8, w - 16, h - 16, "S")
  pdf.setDrawColor(200, 190, 240)
  pdf.setLineWidth(0.3)
  pdf.rect(12, 12, w - 24, h - 24, "S")

  // 🎓 + QUIZ GENIUS logo
  pdf.setFontSize(30)
  pdf.text("🎓", w / 2, 30, { align: "center" })
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(18)
  pdf.setTextColor(124, 58, 237)
  pdf.text("QUIZ", w / 2 - 21, 46, { align: "right" })
  pdf.setTextColor(59, 130, 246)
  pdf.text("GENIUS", w / 2 + 5, 46, { align: "left" })

  // subtitle
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(160, 160, 170)
  pdf.text("CERTIFICATE OF ACHIEVEMENT", w / 2, 58, { align: "center" })
  pdf.setDrawColor(139, 92, 246)
  pdf.setLineWidth(0.4)
  pdf.line(w / 2 - 25, 61, w / 2 + 25, 61)

  // presented to
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.setTextColor(160, 160, 170)
  pdf.text("PRESENTED TO", w / 2, 78, { align: "center" })
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(34)
  pdf.setTextColor(30, 30, 35)
  pdf.text(user?.name || "User", w / 2, 95, { align: "center" })

  // description
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 110)
  const descLines = pdf.splitTextToSize(
    `For successfully completing the quiz on "${result.quizTitle}" with outstanding performance and demonstrating strong subject knowledge.`,
    w - 120
  )
  pdf.text(descLines, w / 2, 115, { align: "center" })

  // divider
  pdf.setDrawColor(220, 220, 230)
  pdf.setLineWidth(0.2)
  pdf.line(60, 135, w - 60, 135)

  // score / percentage / date
  const cols = [
    { label: "SCORE", value: `${result.score}/${result.total}`, size: 18, color: [30, 30, 35] },
    { label: "PERCENTAGE", value: `${result.percentage}%`, size: 18, color: [124, 58, 237] },
    { label: "DATE", value: new Date(result.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), size: 10, color: [30, 30, 35] },
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

  // signature
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

  // cert id at bottom
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(7)
  pdf.setTextColor(200, 200, 200)
  pdf.text(certId, w / 2, h - 10, { align: "center" })

  pdf.save(`Certificate_${quiz}_${name}.pdf`)
}

function CertificatePreview({ result, user, id }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    try {
      generateCertPDF(result, user, id)
      toast.success("Certificate downloaded!")
    } catch (err) {
      toast.error("Failed to generate PDF. Try again.")
    } finally {
      setDownloading(false)
    }
  }

  const passed = result.percentage >= PASS_PERCENTAGE && result.proctorStatus !== "disqualified"
  const scoreColor = passed ? "text-emerald-600" : "text-red-500"

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-2xl border-2 border-violet-200/50 overflow-hidden p-6">
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
          <p className="text-xs text-gray-500 leading-relaxed">
            For successfully completing the quiz on <span className="font-semibold text-gray-800">{result.quizTitle}</span> with outstanding performance and demonstrating strong subject knowledge.
          </p>
        </div>

        <div className="flex justify-center gap-10 mt-5 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Score</div>
            <div className="text-lg font-bold text-gray-900">{result.score}/{result.total}</div>
          </div>
          <div className="text-center">
            <div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Percentage</div>
            <div className={`text-lg font-bold ${scoreColor}`}>{result.percentage}%</div>
          </div>
          <div className="text-center">
            <div className="text-[8px] text-gray-400 uppercase tracking-[1px]">Date</div>
            <div className="text-sm font-semibold text-gray-700">{new Date(result.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-end">
          <div className="text-center">
            <div className="w-24 h-[1px] bg-gray-300 mb-1" />
            <div className="text-[7px] text-gray-400 uppercase tracking-[1px]">Authorized Signature</div>
            <div className="text-[9px] font-semibold text-gray-700 mt-0.5">Quiz Genius Team</div>
          </div>
          <div className="text-center">
            <span className="text-[7px] text-gray-300 font-mono">CERT-{String(id).padStart(4, "0")}-{new Date(result.date).getFullYear()}</span>
          </div>
        </div>
      </div>

      <button onClick={handleDownload} disabled={downloading}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-60 transition-all">
        {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {downloading ? "Generating PDF..." : "Download Certificate PDF"}
      </button>
    </div>
  )
}

export default function Certificates() {
  const { user } = useSelector((s) => s.auth)
  const { data, isLoading, error } = useGetStudentResults()
  const [selectedId, setSelectedId] = useState(null)

  const results = data?.data || []
  const passed = results.filter((r) => r.percentage >= PASS_PERCENTAGE && r.proctorStatus !== "disqualified")
  const failed = results.filter((r) => r.percentage < PASS_PERCENTAGE || r.proctorStatus === "disqualified")

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your achievements and quiz certifications</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={32} className="animate-spin text-violet-600" />
              <span className="text-sm text-gray-400">Loading certificates...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertCircle size={40} className="text-red-400" />
              <span className="text-sm text-gray-500">Failed to load results. Try again later.</span>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-center">
              <Award size={48} className="text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">No certificates yet</h3>
              <p className="text-sm text-gray-400 max-w-md">Complete and pass quizzes to unlock your certificates. You need at least {PASS_PERCENTAGE}% to earn a certificate.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {passed.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-500" /> Eligible Certificates
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {passed.map((result, i) => (
                    <motion.div key={result._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:shadow-violet-500/5 transition-all overflow-hidden">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                          <Award size={28} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{result.quizTitle}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Issued by Quiz Genius</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> Score: {result.score}/{result.total}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium">{result.percentage}%</span>
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {selectedId === result._id ? (
                        <CertificatePreview result={result} user={user} id={i + 1} />
                      ) : (
                        <button onClick={() => setSelectedId(result._id)}
                          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                          <Award size={16} /> View & Download Certificate
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {failed.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" /> Locked Quizzes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {failed.map((result, i) => (
                    <motion.div key={result._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 opacity-70">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{result.quizTitle}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Score: {result.score}/{result.total} ({result.percentage}%)
                          </p>
                          <div className="mt-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/20">
                            <p className="text-xs text-red-600 dark:text-red-400">
                              You have not passed this quiz yet. Complete the quiz successfully to unlock your certificate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
