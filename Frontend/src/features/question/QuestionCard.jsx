import { CheckCircle2, Award, Layers, Circle } from "lucide-react";

const QuestionCard = ({ question, index }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition">
      {/* Header */}

      <div className="flex justify-between items-start mb-5">
        <h2 className="text-lg font-semibold">Question {index + 1}</h2>

        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
          {question.difficulty}
        </span>
      </div>

      {/* Question */}

      <p className="text-gray-800 font-medium leading-7">{question.question}</p>

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Layers size={18} />

          <span>{question.questionType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Award size={18} />

          <span>{question.marks} Marks</span>
        </div>
      </div>

      {/* Options */}

      {question.options?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Options</h3>

          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 border rounded-lg p-3"
              >
                <Circle size={14} />

                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Correct Answer */}

      <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={18} className="text-green-600" />

          <h3 className="font-semibold text-green-700">Correct Answer</h3>
        </div>

        <p className="text-gray-700">
          {question.correctAnswer || question.expectedAnswer}
        </p>
      </div>

      {/* Explanation */}

      {question.explanation && (
        <div className="mt-5">
          <h3 className="font-semibold mb-2">Explanation</h3>

          <p className="text-gray-600">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
