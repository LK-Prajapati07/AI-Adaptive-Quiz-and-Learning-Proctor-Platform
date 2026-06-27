import { BookOpen, CheckCircle, Trophy } from "lucide-react";

import { useGetAllQuiz } from "@/customHook/useQuiz.hook";
import { useUserAttempts } from "@/customHook/attempt.hook";

const StudentDashboard = () => {
  const { data: quizData, isLoading: quizLoading } = useGetAllQuiz();

  const {
    data: attemptData,
    isLoading: attemptLoading,
  } = useUserAttempts();

  if (quizLoading || attemptLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <h2 className="text-lg font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const quizzes = quizData?.quizzes ?? [];

  const attempts = attemptData?.attempts ?? [];

  // Change this according to your backend
  const available = quizzes;

  const completedAttempts = attempts.filter(
    (attempt) => attempt.status === "COMPLETED"
  );

  const bestScore =
    completedAttempts.length > 0
      ? Math.max(
          ...completedAttempts.map(
            (attempt) => attempt.percentage ?? 0
          )
        )
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track your quizzes and performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="bg-white rounded-2xl shadow p-6">
          <BookOpen className="text-blue-600" size={30} />

          <h2 className="mt-4 text-gray-500">
            Available Quizzes
          </h2>

          <p className="mt-2 text-4xl font-bold">
            {available.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <CheckCircle
            className="text-green-600"
            size={30}
          />

          <h2 className="mt-4 text-gray-500">
            Completed Attempts
          </h2>

          <p className="mt-2 text-4xl font-bold">
            {completedAttempts.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <Trophy
            className="text-yellow-500"
            size={30}
          />

          <h2 className="mt-4 text-gray-500">
            Best Score
          </h2>

          <p className="mt-2 text-4xl font-bold">
            {bestScore}%
          </p>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;