import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { useGetAllQuiz } from "@/customHook/useQuiz.hook";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetAllQuiz();

  const quizzes = data?.quizzes || [];
  console.log(quizzes);
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [quizzes, search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-lg font-semibold">Loading Quizzes...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-lg font-semibold text-red-600">
          Failed to load quizzes.
        </h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Available Quizzes</h1>

          <p className="mt-1 text-gray-500">
            Select a quiz and start your assessment.
          </p>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search Quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-72
            rounded-lg
            border
            py-2
            pl-10
            pr-4
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* Quiz Grid */}

      {filteredQuizzes.length === 0 ? (
        <div className="flex justify-center py-24">
          <h2 className="text-xl text-gray-500">No Quiz Found</h2>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <motion.div key={quiz._id} whileHover={{ scale: 1.03 }}>
              <QuizCard quiz={quiz} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default QuizList;
