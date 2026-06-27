import { useParams, useNavigate } from "react-router-dom";

import { useGetSingleQuizId } from "@/customHook/useQuiz.hook";

import {
  BookOpen,
  Brain,
  Clock,
  Hash,
  Award,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

const StudentQuizInformation = () => {
  const { id } = useParams();

  const navigate = useNavigate();

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
        <h2 className="text-lg font-semibold text-red-500">Quiz Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>

            <p className="mt-3 text-gray-500">{quiz.description}</p>
          </div>

          <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-medium text-green-700">
            {quiz.generationStatus}
          </span>
        </div>
      </div>

      {/* Quiz Information */}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <BookOpen className="text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Category</p>

            <h3 className="font-semibold">{quiz.category}</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <Brain className="text-purple-600" />

          <div>
            <p className="text-sm text-gray-500">Difficulty</p>

            <h3 className="font-semibold">{quiz.difficulty}</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <Hash className="text-orange-600" />

          <div>
            <p className="text-sm text-gray-500">Questions</p>

            <h3 className="font-semibold">{quiz.totalQuestions}</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <Clock className="text-cyan-600" />

          <div>
            <p className="text-sm text-gray-500">Duration</p>

            <h3 className="font-semibold">{quiz.duration} Minutes</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <Award className="text-green-600" />

          <div>
            <p className="text-sm text-gray-500">Passing Marks</p>

            <h3 className="font-semibold">{quiz.passingMarks}</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm flex items-center gap-4">
          <CheckCircle className="text-red-600" />

          <div>
            <p className="text-sm text-gray-500">Total Marks</p>

            <h3 className="font-semibold">{quiz.totalMarks}</h3>
          </div>
        </div>
      </div>

      {/* Instructions */}

      <div className="rounded-2xl border bg-blue-50 p-6">
        <h2 className="text-xl font-semibold">Quiz Instructions</h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
          <li>Read each question carefully before answering.</li>

          <li>Do not refresh or close the browser during the quiz.</li>

          <li>Ensure your webcam remains active throughout the assessment.</li>

          <li>Questions are selected adaptively based on your performance.</li>

          <li>
            Your quiz will be submitted automatically when the timer ends.
          </li>
        </ul>
      </div>

      {/* Start Button */}

      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/attempt/start/${quiz._id}`)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <PlayCircle size={20} />
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StudentQuizInformation;
