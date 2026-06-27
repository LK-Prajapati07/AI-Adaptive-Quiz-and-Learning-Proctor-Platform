import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  BookOpen,
  Clock,
  Brain,
  Layers,
} from "lucide-react";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
  };

  const handleClick = () => {
    if (user?.role === "Trainer") {
      navigate(`/dashboard/quiz/${quiz._id}`);
    } else if (user?.role === "Student") {
      navigate(`/dashboard/quiz-details/${quiz._id}`);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Title */}

      <h2 className="text-2xl font-bold text-gray-900">
        {quiz.title}
      </h2>

      <p className="mt-2 line-clamp-2 text-gray-500">
        {quiz.description}
      </p>

      {/* Quiz Details */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-blue-600" />
          <span>{quiz.category}</span>
        </div>

        <div className="flex items-center gap-3">
          <Brain size={18} className="text-purple-600" />
          <span>{quiz.difficulty}</span>
        </div>

        <div className="flex items-center gap-3">
          <Layers size={18} className="text-orange-600" />
          <span>{quiz.totalQuestions} Questions</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-cyan-600" />
          <span>{quiz.duration} Minutes</span>
        </div>

      </div>

      {/* Status */}

      <div className="mt-6">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusColor[quiz.generationStatus]
          }`}
        >
          {quiz.generationStatus}
        </span>
      </div>

      {/* Actions */}

      <div className="mt-6">

        {quiz.generationStatus === "PENDING" &&
          user?.role === "Trainer" && (
            <button
              onClick={() =>
                navigate(`/dashboard/generate-question/${quiz._id}`)
              }
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Generate AI Questions
            </button>
          )}

        {quiz.generationStatus === "COMPLETED" && (
          <button
            onClick={handleClick}
            className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
          >
            {user?.role === "Trainer"
              ? "View Details"
              : "Start Quiz"}
          </button>
        )}

        {quiz.generationStatus === "PROCESSING" && (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-3 font-medium text-gray-700"
          >
            Processing...
          </button>
        )}

      </div>
    </div>
  );
};

export default QuizCard;