import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";

import { useSubmitQuiz } from "@/customHook/attempt.hook";

const Exam = () => {
  const { attemptId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const { mutate, isPending } = useSubmitQuiz();

  const [question, setQuestion] = useState(location.state?.question || null);

  const [answer, setAnswer] = useState("");

  const submitAnswer = () => {
    if (!question) return;

    if (!answer.trim()) {
      alert("Please select or enter an answer.");
      return;
    }

    mutate(
      {
        attemptId,
        questionId: question._id,
        answer,
      },
      {
        onSuccess: (response) => {
          if (response.completed) {
            navigate(`/result/${attemptId}`);
            return;
          }

          setQuestion(response.nextQuestion);

          setAnswer("");
        },
      },
    );
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading Question...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto py-8 space-y-6">
        {/* Timer */}

        <Timer
          duration={60}
          onTimeUp={() => {
            navigate(`/result/${attemptId}`);
          }}
        />

        {/* Question */}

        <QuestionCard
          question={question}
          answer={answer}
          setAnswer={setAnswer}
        />

        {/* Action */}

        <div className="flex justify-end">
          <button
            onClick={submitAnswer}
            disabled={isPending}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-xl
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isPending ? "Submitting..." : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
