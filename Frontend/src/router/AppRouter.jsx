import { Routes, Route, Navigate } from "react-router-dom";

import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";

import ProtectedRouter from "./ProtectedRoute";

import DashboardLayout from "@/components/layout/DashboardLayout";

// Dashboard
import Dashboard from "@/features/dashboard/Dashboard";

// Trainer
import CreateQuiz from "@/features/quiz/CreateQuiz";
import ManageQuiz from "@/features/quiz/ManageQuiz";
import QuizInformation from "@/features/quiz/QuizInformation";

import GenerateQuestion from "@/features/question/GenerateQuestion";
import QuestionList from "@/features/question/QuestionList";

// Student
import QuizList from "@/features/quiz/QuizList";
import AttemptHistory from "@/features/attempt/AttemptHistory";

// Exam
import StartAttempt from "@/features/attempt/StartAttempt";
import Exam from "@/features/attempt/Exam";
import Result from "@/features/attempt/Result";
import StudentQuizInformation from "@/features/quiz/StudentQuizInformation";

const AppRouter = () => {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= Dashboard ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRouter>
            <DashboardLayout />
          </ProtectedRouter>
        }
      >
        {/* Dashboard */}

        <Route index element={<Dashboard />} />

        {/* ================= Trainer Routes ================= */}

        <Route
          path="create-quiz"
          element={
            <ProtectedRouter allowedRoles={["Trainer"]}>
              <CreateQuiz />
            </ProtectedRouter>
          }
        />

        <Route
          path="manage-quiz"
          element={
            <ProtectedRouter allowedRoles={["Trainer"]}>
              <ManageQuiz />
            </ProtectedRouter>
          }
        />

        <Route
          path="quiz/:id"
          element={
            <ProtectedRouter allowedRoles={["Trainer"]}>
              <QuizInformation />
            </ProtectedRouter>
          }
        />

        <Route
          path="generate-question/:quizId"
          element={
            <ProtectedRouter allowedRoles={["Trainer"]}>
              <GenerateQuestion />
            </ProtectedRouter>
          }
        />

        <Route
          path="questions/:quizId"
          element={
            <ProtectedRouter allowedRoles={["Trainer"]}>
              <QuestionList />
            </ProtectedRouter>
          }
        />

        {/* ================= Student Routes ================= */}

        <Route
          path="quizzes"
          element={
            <ProtectedRouter allowedRoles={["Student"]}>
              <QuizList />
            </ProtectedRouter>
          }
        />
        <Route
        path="quiz-details/:id"
        element={<ProtectedRouter allowedRoles={["Student"]}>
              <StudentQuizInformation />
            </ProtectedRouter>}
        />
        <Route
          path="attempts"
          element={
            <ProtectedRouter allowedRoles={["Student"]}>
              <AttemptHistory />
            </ProtectedRouter>
          }
        />
      </Route>

      {/* ================= Exam Routes ================= */}

      <Route
        path="/attempt/start/:quizId"
        element={
          <ProtectedRouter allowedRoles={["Student"]}>
            <StartAttempt />
          </ProtectedRouter>
        }
      />

      <Route
        path="/exam/:attemptId"
        element={
          <ProtectedRouter allowedRoles={["Student"]}>
            <Exam />
          </ProtectedRouter>
        }
      />

      <Route
        path="/result/:attemptId"
        element={
          <ProtectedRouter allowedRoles={["Student"]}>
            <Result />
          </ProtectedRouter>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;