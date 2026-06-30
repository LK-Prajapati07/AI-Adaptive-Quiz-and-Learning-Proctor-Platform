import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import {
  Clock, AlertTriangle, ChevronRight, ChevronLeft,
  Flag, Eye, Camera
} from "lucide-react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import ProctorCamera from "@/components/proctor/ProctorCamera"

const demoQuestions = [
  { _id: "qq1", question: "What is a closure in JavaScript?", options: ["A function with its lexical scope", "A closed block of code", "A type of loop", "An error handler"], correctAnswer: "A function with its lexical scope" },
  { _id: "qq2", question: "What does the `useState` hook return?", options: ["A variable and a setter", "An object", "An array of two values", "A promise"], correctAnswer: "An array of two values" },
  { _id: "qq3", question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" },
  { _id: "qq4", question: "What is the output of `typeof null`?", options: ["null", "object", "undefined", "boolean"], correctAnswer: "object" },
  { _id: "qq5", question: "What is Promise.all() used for?", options: ["Race promises", "Run promises sequentially", "Wait for all promises", "Cancel promises"], correctAnswer: "Wait for all promises" },
  { _id: "qq6", question: "Which React hook is used for side effects?", options: ["useEffect", "useState", "useReducer", "useMemo"], correctAnswer: "useEffect" },
  { _id: "qq7", question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
  { _id: "qq8", question: "What is the time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], correctAnswer: "O(log n)" },
  { _id: "qq9", question: "What is a Promise in JavaScript?", options: ["An async value handler", "A sync function", "A callback wrapper", "A module system"], correctAnswer: "An async value handler" },
  { _id: "qq10", question: "Which company developed React?", options: ["Meta (Facebook)", "Google", "Microsoft", "Twitter"], correctAnswer: "Meta (Facebook)" },
]

export default function QuizAttempt() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [questions] = useState(demoQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [flagged, setFlagged] = useState([])
  const [timeLeft, setTimeLeft] = useState(900)
  const [proctorWarnings, setProctorWarnings] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [proctorPanel, setProctorPanel] = useState(true)
  const [warningMsg, setWarningMsg] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const questionPanelRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); finishAttempt(); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleProctorWarning = useCallback(() => {
    const msgs = [
      "Multiple faces detected in frame",
      "Face not visible — looking away",
      "Suspicious movement detected",
      "Unknown person detected",
      "Eye gaze tracking alert",
    ]
    setWarningMsg(msgs[Math.floor(Math.random() * msgs.length)])
    setProctorWarnings((p) => {
      const next = p + 1
      if (next >= 3) {
        setTimeout(() => finishAttempt(true), 1000)
      }
      return next
    })
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 4000)
  }, [])

  const finishAttempt = useCallback((disqualified = false) => {
    navigate(`/student/result/${attemptId}`, {
      state: {
        answers,
        total: questions.length,
        proctorWarnings,
        proctorStatus: disqualified ? "disqualified" : proctorWarnings >= 3 ? "disqualified" : "clean",
      },
    })
  }, [answers, questions.length, proctorWarnings, attemptId, navigate])

  const handleSubmit = () => {
    if (selected === null) return
    const updatedAnswers = [...answers, { questionId: questions[currentIndex]._id, answer: selected }]
    setAnswers(updatedAnswers)
    if (currentIndex + 1 >= questions.length) {
      navigate(`/student/result/${attemptId}`, {
        state: { answers: updatedAnswers, total: questions.length, proctorWarnings, proctorStatus: proctorWarnings >= 3 ? "disqualified" : "clean" },
      })
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
    }
  }

  const toggleFlag = () => {
    setFlagged((prev) => prev.includes(currentIndex) ? prev.filter((f) => f !== currentIndex) : [...prev, currentIndex])
  }

  const goToQuestion = (index) => {
    setCurrentIndex(index)
    setSelected(null)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const currentQ = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = answers.length

  return (
    <DashboardLayout>
      {/* Proctor Warning Toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div initial={{ opacity: 0, y: -50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 shadow-2xl shadow-red-500/20 min-w-[320px]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-800 dark:text-red-300 text-sm">Proctor Warning ({proctorWarnings}/3)</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{warningMsg}</p>
                <div className="mt-2 h-1.5 rounded-full bg-red-100 dark:bg-red-900/40 overflow-hidden w-full max-w-[200px]">
                  <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(proctorWarnings / 3) * 100}%` }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 h-[calc(100vh-120px)]">
        {/* Question Panel */}
        <div ref={questionPanelRef} className="flex-1 min-w-0 flex flex-col">
          {/* Top Bar */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {currentIndex + 1}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">of {questions.length}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 ml-3">
                {questions.map((_, i) => (
                  <button key={i} onClick={() => goToQuestion(i)}
                    className={`w-6 h-6 rounded-md text-[10px] font-medium transition-all ${
                      i === currentIndex
                        ? "bg-violet-600 text-white scale-110"
                        : answers.find(a => a.questionId === questions[i]._id)
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : flagged.includes(i)
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}>
                      {i + 1}
                    </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isMobile && (
                <button onClick={() => setProctorPanel(!proctorPanel)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    proctorPanel
                      ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                  <Camera size={14} /> {proctorPanel ? "Proctor On" : "Proctor Off"}
                </button>
              )}
              <button onClick={toggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  flagged.includes(currentIndex)
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}>
                <Flag size={14} /> {flagged.includes(currentIndex) ? "Flagged" : "Flag"}
              </button>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tabular-nums ${
                timeLeft < 120
                  ? "bg-red-50 dark:bg-red-900/30 text-red-600"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}>
                <Clock size={14} />
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
              <button onClick={() => finishAttempt()}
                className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-all">
                End
              </button>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-violet-500 to-blue-600 rounded-full"
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>

          {/* Question Card */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-medium">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  {flagged.includes(currentIndex) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 flex items-center gap-1">
                      <Flag size={10} /> Flagged
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mt-3 mb-6">{currentQ?.question}</h2>
                <div className="space-y-3">
                  {currentQ?.options.map((opt, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
                      onClick={() => setSelected(opt)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all ${
                        selected === opt
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 shadow-sm"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                          selected === opt
                            ? "bg-violet-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                        }`}>{String.fromCharCode(65 + i)}</div>
                        <span className="text-sm sm:text-base">{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
            <button onClick={() => goToQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="text-xs text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">{answeredCount}</span> answered ·{" "}
              <span className="font-semibold text-yellow-600">{flagged.length}</span> flagged
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSubmit} disabled={selected === null}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-violet-500/30 transition-all">
              {currentIndex + 1 >= questions.length ? "Finish" : "Next"} <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>

        {/* Proctor Camera Panel - single instance based on screen size */}
        {proctorPanel && !isMobile && (
          <div className="w-[280px] shrink-0 hidden lg:block">
            <ProctorCamera onWarning={handleProctorWarning} warnings={proctorWarnings} />
          </div>
        )}

        {/* Mobile overlay */}
        {proctorPanel && isMobile && (
          <div className="fixed inset-0 z-30 bg-black/50 flex items-end" onClick={() => setProctorPanel(false)}>
            <div className="w-full bg-white dark:bg-gray-900 rounded-t-3xl p-4 max-h-[60vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4" />
              <ProctorCamera onWarning={handleProctorWarning} warnings={proctorWarnings} />
            </div>
          </div>
        )}

        {/* Mobile floating toggle */}
        {isMobile && (
          <button onClick={() => setProctorPanel(!proctorPanel)}
            className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-xl flex items-center justify-center">
            {proctorPanel ? <Eye size={20} /> : <Camera size={20} />}
          </button>
        )}
      </div>
    </DashboardLayout>
  )
}
