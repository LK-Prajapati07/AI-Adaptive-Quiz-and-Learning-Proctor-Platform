import { CheckCircle2 } from "lucide-react";

const QuestionNavigation = ({ currentQuestion, totalQuestions }) => {
  return (
    <div
      className="
      bg-white
      border
      rounded-2xl
      shadow-sm
      p-6
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Question Progress</h2>

          <p className="text-sm text-gray-500 mt-1">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>

        <div
          className="
          h-14
          w-14
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          "
        >
          <CheckCircle2 className="text-blue-600" size={28} />
        </div>
      </div>

      {/* Progress Bar */}

      <div className="mt-6">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="
            h-full
            bg-blue-600
            transition-all
            duration-500
            "
            style={{
              width: `${(currentQuestion / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Numbers */}

      <div className="flex justify-between mt-3 text-sm text-gray-500">
        <span>{currentQuestion}</span>

        <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>

        <span>{totalQuestions}</span>
      </div>
    </div>
  );
};

export default QuestionNavigation;
