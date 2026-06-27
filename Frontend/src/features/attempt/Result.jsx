import { useNavigate, useParams } from "react-router-dom";
import { Trophy, BookOpen, Target, ArrowLeft } from "lucide-react";

import { useResult } from "@/customHook/attempt.hook";
import ResultQuestionCard from "./components/ResultQuestionCard";

const Result = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useResult(attemptId);

  const attempt = data?.attempt;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading Result...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error?.message || "Something went wrong while loading the result."}
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Result Found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold">Quiz Result</h1>

          <p className="text-gray-500 mt-2">
            {attempt.quiz?.title || "Untitled Quiz"}
          </p>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <Trophy size={32} className="text-yellow-500 mb-3" />

            <h3 className="text-gray-500">Score</h3>

            <h2 className="text-3xl font-bold">
              {attempt.totalScore} / {attempt.maxScore}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Target size={32} className="text-green-500 mb-3" />

            <h3 className="text-gray-500">Percentage</h3>

            <h2 className="text-3xl font-bold">{attempt.percentage}%</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <BookOpen size={32} className="text-blue-500 mb-3" />

            <h3 className="text-gray-500">Category</h3>

            <h2 className="text-xl font-semibold">
              {attempt.quiz?.category || "N/A"}
            </h2>
          </div>
        </div>

        {/* Questions */}
        <div className="mt-10 space-y-6">
          {attempt.questions?.length > 0 ? (
            attempt.questions.map((question, index) => (
              <ResultQuestionCard
                key={question._id || index}
                index={index}
                question={question}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
              No questions found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/dashboard/attempts")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            Back to Attempts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
