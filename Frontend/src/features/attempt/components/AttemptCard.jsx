import { useNavigate } from "react-router-dom";

import { CalendarDays, Trophy, Eye, BookOpen, Clock } from "lucide-react";

const AttemptCard = ({ attempt }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
      bg-white
      border
      rounded-2xl
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      p-6
      "
    >
      {/* Quiz Title */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {attempt.quiz?.title}
          </h2>

          <p className="text-gray-500 mt-1">{attempt.quiz?.category}</p>
        </div>

        <span
          className="
          px-3
          py-1
          rounded-full
          text-sm
          bg-green-100
          text-green-700
          "
        >
          {attempt.status}
        </span>
      </div>

      {/* Information */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600" size={22} />

          <div>
            <p className="text-gray-500 text-sm">Difficulty</p>

            <h3 className="font-semibold">{attempt.quiz?.difficulty}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" size={22} />

          <div>
            <p className="text-gray-500 text-sm">Score</p>

            <h3 className="font-semibold">
              {attempt.totalScore} / {attempt.maxScore}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-green-600" size={22} />

          <div>
            <p className="text-gray-500 text-sm">Percentage</p>

            <h3 className="font-semibold">{attempt.percentage}%</h3>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between mt-8 border-t pt-5">
        <div className="flex items-center gap-2 text-gray-500">
          <CalendarDays size={18} />

          <span>{new Date(attempt.createdAt).toLocaleDateString()}</span>
        </div>

        <button
          onClick={() => navigate(`/result/${attempt._id}`)}
          className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-xl
          transition
          "
        >
          <Eye size={18} />
          View Result
        </button>
      </div>
    </div>
  );
};

export default AttemptCard;
