import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";

import { Route, Routes } from "react-router-dom";

import ProtectedRouter from "./ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ManageQuiz from "@/features/quiz/ManageQuiz";
import QuizList from "@/features/quiz/QuizList";
import Dashboar from "@/features/dashboard/Dashboard";
import CreateQuiz from "@/features/quiz/createQuiz";



const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRouter>
            <DashboardLayout />
          </ProtectedRouter>
        }
      >
        <Route index element={<Dashboar/>} />

        {/* Trainer */}

        <Route path="create-quiz" element={<CreateQuiz />} />

        <Route path="manage-quiz" element={<ManageQuiz />} />

        {/* Student */}

        <Route path="quizzes" element={<QuizList />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
