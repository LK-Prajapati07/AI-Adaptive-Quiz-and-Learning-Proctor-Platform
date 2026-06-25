

import { useGetAllQuiz } from "@/customHook/useQuiz.hook";
import { BookOpen, Brain, Clock } from "lucide-react";

const TrainerDashboard = () => {
  const { data, isLoading } = useGetAllQuiz();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const quizzes = data?.quizzes || [];

  const completed = quizzes.filter(
    (q) => q.generationStatus === "COMPLETED",
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trainer Dashboard</h1>

      <div
        className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"
      >
        {/* total quiz */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <BookOpen />

          <h2 className="text-gray-500 mt-3">Total Quiz</h2>

          <p className="text-3xl font-bold">{quizzes.length}</p>
        </div>

        {/* generated */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <Brain />

          <h2 className="text-gray-500 mt-3">AI Generated</h2>

          <p className="text-3xl font-bold">{completed}</p>
        </div>

        {/* pending */}

        <div
          className="
bg-white
p-6
rounded-xl
shadow
"
        >
          <Clock />

          <h2 className="text-gray-500 mt-3">Pending</h2>

          <p className="text-3xl font-bold">{quizzes.length - completed}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
