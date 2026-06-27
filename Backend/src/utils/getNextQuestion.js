export const getNextQuestion = (session) => {
  const findQuestion = (difficulty) => {
    const questions = session[difficulty] || [];

    return questions.find(
      (question) =>
        !session.attempted.includes(question._id.toString())
    );
  };

  // Try current difficulty first
  let nextQuestion = findQuestion(session.currentDifficulty);

  if (nextQuestion) {
    return nextQuestion;
  }

  // Adaptive fallback order
  const difficultyOrder = {
    Easy: ["Medium", "Hard"],
    Medium: ["Easy", "Hard"],
    Hard: ["Medium", "Easy"],
  };

  const fallbacks = difficultyOrder[session.currentDifficulty] || [];

  for (const difficulty of fallbacks) {
    nextQuestion = findQuestion(difficulty);

    if (nextQuestion) {
      session.currentDifficulty = difficulty;
      return nextQuestion;
    }
  }

  // Final fallback: search every pool
  for (const difficulty of ["Easy", "Medium", "Hard"]) {
    nextQuestion = findQuestion(difficulty);

    if (nextQuestion) {
      session.currentDifficulty = difficulty;
      return nextQuestion;
    }
  }

  // No questions remaining
  return null;
};