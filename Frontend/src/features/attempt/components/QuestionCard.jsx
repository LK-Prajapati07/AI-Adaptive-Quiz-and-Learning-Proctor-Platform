const QuestionCard = ({ question, answer, setAnswer }) => {
  if (!question) return null;

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      border
      p-8
      "
    >
      {/* Question */}

      <div className="mb-8">
        <span
          className="
          inline-block
          px-3
          py-1
          rounded-full
          bg-blue-100
          text-blue-600
          text-sm
          font-medium
          "
        >
          {question.difficulty}
        </span>

        <h2
          className="
          mt-5
          text-2xl
          font-semibold
          text-gray-800
          "
        >
          {question.question}
        </h2>
      </div>

      {/* MCQ */}

      {question.questionType === "MCQ" && (
        <div className="space-y-4">
          {question.options.map((option) => (
            <label
              key={option}
              className="
              flex
              items-center
              gap-4
              p-4
              border
              rounded-xl
              cursor-pointer
              hover:bg-blue-50
              transition
              "
            >
              <input
                type="radio"
                value={option}
                checked={answer === option}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* TRUE FALSE */}

      {question.questionType === "TRUE_FALSE" && (
        <div className="space-y-4">
          {["True", "False"].map((option) => (
            <label
              key={option}
              className="
              flex
              items-center
              gap-4
              p-4
              border
              rounded-xl
              cursor-pointer
              hover:bg-blue-50
              "
            >
              <input
                type="radio"
                value={option}
                checked={answer === option}
                onChange={(e) => setAnswer(e.target.value)}
              />

              {option}
            </label>
          ))}
        </div>
      )}

      {/* Fill Blank */}

      {question.questionType === "FILL_BLANK" && (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
          className="
          w-full
          border
          rounded-xl
          p-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />
      )}

      {/* Subjective */}

      {question.questionType === "SUBJECTIVE" && (
        <textarea
          rows={8}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="
          w-full
          border
          rounded-xl
          p-4
          resize-none
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />
      )}
    </div>
  );
};

export default QuestionCard;
