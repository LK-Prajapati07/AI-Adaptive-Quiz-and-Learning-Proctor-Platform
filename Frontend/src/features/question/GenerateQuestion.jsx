import { useParams, useNavigate } from "react-router-dom";

import { Loader2, Brain, BookOpen, Clock } from "lucide-react";

import { useGenerateQuestion } from "@/customHook/useQuestion.hook";
import { useGetSingleQuizId } from "@/customHook/useQuiz.hook";

const GenerateQuestion = () => {
  const { quizId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleQuizId(quizId);
  console.log(data)
  

  const { mutate, isPending } = useGenerateQuestion();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  const quiz = data?.data;

  const handleGenerate = () => {
    mutate(
      {
        quizId,
        data: {},
      },
      {
        onSuccess: () => {
          navigate("/dashboard/manage-quiz");
        },
      },
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="text-blue-600" size={34} />

          <div>
            <h1 className="text-3xl font-bold">Generate AI Questions</h1>

            <p className="text-gray-500">
              Generate questions automatically from the uploaded PDF.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">Quiz Information</h2>

            <div className="space-y-3">
              <p>
                <strong>Title :</strong> {quiz?.title}
              </p>

              <p>
                <strong>Category :</strong> {quiz?.category}
              </p>

              <p>
                <strong>Difficulty :</strong> {quiz?.difficulty}
              </p>

              <p>
                <strong>Question Type :</strong> {quiz?.questionType}
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">Configuration</h2>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                {quiz?.totalQuestions} Questions
              </div>

              <div className="flex items-center gap-2">
                <Clock size={18} />
                {quiz?.duration} Minutes
              </div>

              <p>
                <strong>Passing Marks :</strong> {quiz?.passingMarks}
              </p>

              <p>
                <strong>Total Marks :</strong> {quiz?.totalMarks}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleGenerate}
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Generating Questions...
              </span>
            ) : (
              "Generate Questions"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuestion;
