import { useParams, Link } from "react-router-dom";
import { useGetSingleQuizId } from "@/customHook/useQuiz.hook";

import { BookOpen, Clock, Brain, Award, Hash, CheckCircle } from "lucide-react";

const QuizInformation = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSingleQuizId(id);

  const quiz = data?.quiz;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-lg font-semibold">Loading Quiz...</h2>
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold text-red-500">Quiz Not Found</h2>
      </div>
    );
  }

  const statusStyle =
    quiz.generationStatus === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : quiz.generationStatus === "PROCESSING"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">{quiz.title}</h1>

            <p className="max-w-3xl text-gray-500">{quiz.description}</p>
          </div>

          <span
            className={`
            rounded-full
            px-5
            py-2
            text-sm
            font-semibold
            ${statusStyle}
            `}
          >
            {quiz.generationStatus}
          </span>
        </div>

        {/* Information */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" />
            <span>Category : {quiz.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" />
            <span>Difficulty : {quiz.difficulty}</span>
          </div>

          <div className="flex items-center gap-3">
            <Hash className="text-orange-600" />
            <span>Total Questions : {quiz.totalQuestions}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-cyan-600" />
            <span>Duration : {quiz.duration} Minutes</span>
          </div>

          <div className="flex items-center gap-3">
            <Award className="text-green-600" />
            <span>Passing Marks : {quiz.passingMarks}</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-red-600" />
            <span>Total Marks : {quiz.totalMarks}</span>
          </div>
        </div>

        {/* Extra */}

        <div className="mt-10 rounded-xl bg-gray-50 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <span className="font-semibold">Randomized :</span>{" "}
              {quiz.isRandomized ? "Yes" : "No"}
            </div>

            <div>
              <span className="font-semibold">Adaptive :</span>{" "}
              {quiz.isAdaptive ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-10 flex flex-wrap gap-4">
          {quiz.generationStatus === "PENDING" && (
            <Link
              to={`/dashboard/generate-question/${quiz._id}`}
              className="
              rounded-lg
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              "
            >
              Generate Questions
            </Link>
          )}

          {quiz.generationStatus === "COMPLETED" && (
            <Link
              to={`/dashboard/questions/${quiz._id}`}
              className="
              rounded-lg
              bg-green-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-green-700
              "
            >
              View Questions
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInformation;
