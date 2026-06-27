import { useGetAllQuiz } from "@/customHook/useQuiz.hook";
import QuizCard from "./QuizCard";

import { motion } from "framer-motion";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageQuiz = () => {
  const { data, isLoading } = useGetAllQuiz();
  console.log(data)

  const quizzes = data?.quizzes || [];
  console.log(quizzes)

  if (isLoading) {
    return (
      <div className="space-y-8">

        <Skeleton className="h-10 w-72" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-72 rounded-2xl"
            />
          ))}
        </div>

      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >

      {/* Header */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <div>

            <CardTitle className="text-3xl font-bold"vi>
              Manage Quiz
            </CardTitle>

            <p className="text-muted-foreground mt-2">
              Create, manage and generate AI questions for your quizzes.
            </p>

          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-5 py-4">

            <BookOpen className="text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Total Quiz
              </p>

              <h2 className="text-2xl font-bold">
                {quizzes.length}
              </h2>

            </div>

          </div>

        </CardHeader>

      </Card>

      {/* Quiz Grid */}

      {quizzes.length === 0 ? (

        <Card>

          <CardContent className="flex flex-col items-center justify-center py-20">

            <BookOpen
              size={60}
              className="text-muted-foreground mb-5"
            />

            <h2 className="text-2xl font-semibold">
              No Quiz Found
            </h2>

            <p className="text-muted-foreground mt-2">
              Create your first quiz to start generating AI questions.
            </p>

          </CardContent>

        </Card>

      ) : (

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >

          {quizzes.map((quiz, index) => (

            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <QuizCard quiz={quiz} />
            </motion.div>

          ))}

        </motion.div>

      )}

    </motion.div>
  );
};

export default ManageQuiz;