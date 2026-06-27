import { useParams } from "react-router-dom";


import QuestionCard from "./QuestionCard";
import { useGetQuestionsByQuizId } from "@/customHook/useQuestion.hook";

const QuestionList = () => {

  const { quizId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useGetQuestionsByQuizId(quizId);
  console.log(data)

  const questions = data?.data;
  console.log(questions)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-lg font-semibold">
          Loading Questions...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-red-500 text-lg">
          Failed to load questions.
        </h1>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-gray-500 text-lg">
          No Questions Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Generated Questions
          </h1>

          <p className="text-gray-500 mt-2">
            Total Questions : {questions.length}
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {questions.map((question, index) => (

          <QuestionCard
            key={question._id}
            question={question}
            index={index}
          />

        ))}

      </div>

    </div>
  );
};

export default QuestionList;