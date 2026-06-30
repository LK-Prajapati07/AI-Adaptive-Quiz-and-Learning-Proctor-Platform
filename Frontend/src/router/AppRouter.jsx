import { Route, Routes } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"

import Home from "@/Pages/Home"
import Login from "@/Pages/Login"
import Register from "@/Pages/Register"
import ProtectedRoute from "@/router/ProtectedRoute"

// Trainer (old)
import CreateQuiz from "@/Pages/Trainer/CreateQuiz"
import QuizList from "@/Pages/Trainer/QuizList"
import GenerateQuestions from "@/Pages/Trainer/GenerateQuestions"
import ViewQuestions from "@/Pages/Trainer/ViewQuestions"

// Student (old)
import AvailableQuizzes from "@/Pages/Student/AvailableQuizzes"
import StartQuiz from "@/Pages/Student/StartQuiz"
import QuizAttempt from "@/Pages/Student/QuizAttempt"
import Result from "@/Pages/Student/Result"
import MyResults from "@/Pages/Student/MyResults"

// Recruiter (old)
import CandidateReports from "@/Pages/Recruiter/CandidateReports"
import ProctorReports from "@/Pages/Recruiter/ProctorReports"

// New Dashboard pages
import DashboardHome from "@/Pages/dashboard/DashboardHome"
import Quizzes from "@/Pages/dashboard/Quizzes"
import LiveQuizzes from "@/Pages/dashboard/LiveQuizzes"
import Practice from "@/Pages/dashboard/Practice"
import QuestionBank from "@/Pages/dashboard/QuestionBank"
import MyAttempts from "@/Pages/dashboard/MyAttempts"
import Results from "@/Pages/dashboard/Results"
import Certificates from "@/Pages/dashboard/Certificates"
import Leaderboard from "@/Pages/dashboard/Leaderboard"
import Achievements from "@/Pages/dashboard/Achievements"
import Bookmarks from "@/Pages/dashboard/Bookmarks"
import Messages from "@/Pages/dashboard/Messages"
import Settings from "@/Pages/dashboard/Settings"
import Profile from "@/Pages/dashboard/Profile"
import Programming from "@/Pages/dashboard/categories/Programming"
import Aptitude from "@/Pages/dashboard/categories/Aptitude"
import GeneralKnowledge from "@/Pages/dashboard/categories/GeneralKnowledge"
import Science from "@/Pages/dashboard/categories/Science"
import Mathematics from "@/Pages/dashboard/categories/Mathematics"
import English from "@/Pages/dashboard/categories/English"
import InterviewPreparation from "@/Pages/dashboard/categories/InterviewPreparation"

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Old Trainer routes */}
        <Route path="/trainer/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path="/trainer/quiz-list" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
        <Route path="/trainer/generate-questions" element={<ProtectedRoute><GenerateQuestions /></ProtectedRoute>} />
        <Route path="/trainer/view-questions" element={<ProtectedRoute><ViewQuestions /></ProtectedRoute>} />

        {/* Old Student routes */}
        <Route path="/student/quizzes" element={<ProtectedRoute><AvailableQuizzes /></ProtectedRoute>} />
        <Route path="/student/start-quiz/:quizId" element={<ProtectedRoute><StartQuiz /></ProtectedRoute>} />
        <Route path="/student/attempt/:attemptId" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />
        <Route path="/student/result/:attemptId" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/student/results" element={<ProtectedRoute><MyResults /></ProtectedRoute>} />

        {/* Old Recruiter routes */}
        <Route path="/recruiter/candidates" element={<ProtectedRoute><CandidateReports /></ProtectedRoute>} />
        <Route path="/recruiter/proctor" element={<ProtectedRoute><ProctorReports /></ProtectedRoute>} />

        {/* New Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/dashboard/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
        <Route path="/dashboard/live-quizzes" element={<ProtectedRoute><LiveQuizzes /></ProtectedRoute>} />
        <Route path="/dashboard/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
        <Route path="/dashboard/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
        <Route path="/dashboard/my-attempts" element={<ProtectedRoute><MyAttempts /></ProtectedRoute>} />
        <Route path="/dashboard/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/dashboard/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/dashboard/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/dashboard/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path="/dashboard/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Category routes */}
        <Route path="/dashboard/categories/programming" element={<ProtectedRoute><Programming /></ProtectedRoute>} />
        <Route path="/dashboard/categories/aptitude" element={<ProtectedRoute><Aptitude /></ProtectedRoute>} />
        <Route path="/dashboard/categories/general-knowledge" element={<ProtectedRoute><GeneralKnowledge /></ProtectedRoute>} />
        <Route path="/dashboard/categories/science" element={<ProtectedRoute><Science /></ProtectedRoute>} />
        <Route path="/dashboard/categories/mathematics" element={<ProtectedRoute><Mathematics /></ProtectedRoute>} />
        <Route path="/dashboard/categories/english" element={<ProtectedRoute><English /></ProtectedRoute>} />
        <Route path="/dashboard/categories/interview-prep" element={<ProtectedRoute><InterviewPreparation /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default AppRouter
