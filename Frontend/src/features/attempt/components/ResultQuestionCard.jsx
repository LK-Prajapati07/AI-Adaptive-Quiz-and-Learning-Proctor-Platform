import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  Award,
  BookOpen,
} from "lucide-react";

const ResultQuestionCard = ({ index, question }) => {
  const isCorrect = question.score === question.maxScore;

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      shadow-sm
      p-6
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Question {index + 1}</h2>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium
          ${
            isCorrect
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
      </div>

      {/* Question */}

      <div className="mt-6">
        <h3 className="font-semibold flex items-center gap-2">
          <BookOpen size={18} />
          Question
        </h3>

        <p className="mt-2 text-gray-700">{question.question?.question}</p>
      </div>

      {/* User Answer */}

      <div className="mt-6">
        <h3 className="font-semibold flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2 className="text-green-600" size={18} />
          ) : (
            <XCircle className="text-red-600" size={18} />
          )}
          Your Answer
        </h3>

        <p className="mt-2 text-gray-700">
          {question.userAnswer || "Not Answered"}
        </p>
      </div>

      {/* Correct Answer */}

      <div className="mt-6">
        <h3 className="font-semibold">Correct Answer</h3>

        <p className="mt-2 text-green-700">
          {question.question?.correctAnswer}
        </p>
      </div>

      {/* Score */}

      <div className="mt-6 flex items-center gap-2">
        <Award className="text-yellow-500" size={20} />

        <span className="font-medium">Score :</span>

        <span>
          {question.score} / {question.maxScore}
        </span>
      </div>

      {/* Evaluation */}

      <div className="mt-4">
        <span className="font-medium">Evaluation Method :</span>

        <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
          {question.evaluationMethod}
        </span>
      </div>

      {/* Feedback */}

      {question.feedback && (
        <div
          className="
          mt-6
          bg-blue-50
          border
          border-blue-200
          rounded-xl
          p-4
          "
        >
          <h3 className="flex items-center gap-2 font-semibold">
            <MessageSquare size={18} />
            Feedback
          </h3>

          <p className="mt-2 text-gray-700">{question.feedback}</p>
        </div>
      )}

      {/* Explanation */}

      {question.question?.explanation && (
        <div
          className="
          mt-6
          bg-green-50
          border
          border-green-200
          rounded-xl
          p-4
          "
        >
          <h3 className="font-semibold">Explanation</h3>

          <p className="mt-2 text-gray-700">{question.question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ResultQuestionCard;
