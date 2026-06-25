

import { useUserAttempts } from "@/customHook/attempt.hook";
import { useGetAllQuiz } from "@/customHook/useQuiz.hook";
import { BookOpen, Trophy, CheckCircle } from "lucide-react";

const StudentDashboard = () => {
  const { data: quizData } = useGetAllQuiz();

  const { data: attemptData } = useUserAttempts();

  const quizzes = quizData?.quizzes || [];

  const attempts = attemptData?.attempts || [];

  const available = quizzes.filter((q) => q.generationStatus === "COMPLETED");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <div
        className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"
      >
        {/* available */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <BookOpen />

          <h2 className="text-gray-500 mt-3">Available Quiz</h2>

          <p className="text-3xl font-bold">{available.length}</p>
        </div>

        {/* attempts */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <CheckCircle />

          <h2 className="text-gray-500 mt-3">Completed Attempts</h2>

          <p className="text-3xl font-bold">{attempts.length}</p>
        </div>

        {/* score */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <Trophy />

          <h2 className="text-gray-500 mt-3">Best Score</h2>

          <p className="text-3xl font-bold">
            {attempts.length
              ? Math.max(...attempts.map((a) => a.percentage || 0))
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
