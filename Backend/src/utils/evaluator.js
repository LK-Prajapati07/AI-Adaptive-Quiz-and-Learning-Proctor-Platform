import axios from "axios";
export const evaluateAnswer = async (question, userAnswer) => {
  switch (question.questionType) {
    case "MCQ":
      return {
        score: question.correctAnswer === userAnswer ? question.marks : 0,
        maxScore: question.marks,
        method: "NODE",
      };

    case "TRUE_FALSE":
      return {
        score:
          String(question.correctAnswer).toLowerCase() ===
            String(userAnswer).toLowerCase()
            ? question.marks
            : 0,
        maxScore: question.marks,
        method: "NODE",
      };
    case "FILL_BLANK":
      const isCorrect =
        question.correctAnswer.trim().toLowerCase() ===
        userAnswer.trim().toLowerCase();
      return {
        score: isCorrect ? question.marks : 0,
        maxScore: question.marks,
        method: "NODE",
      };
    case "SUBJECTIVE":
      const { data } = await axios.post(
        "http://127.0.0.1:8000/evaluation/answer",

        {
          question_id: question._id.toString(),
          question: question.question,
          expectedAnswer: question.expectedAnswer,
          userAnswer: userAnswer,
          marks: question.marks,
        },
      );
      return data;
    default:
      throw new Error("Invalid question type");
  }
};
