export const updateDifficulty = (session, evaluation) => {
  const percentage = (evaluation.score / evaluation.maxScore) * 100;

  if (percentage >= 80) {
    if (session.currentDifficulty === "easy") {
      session.currentDifficulty = "medium";
    } else if (session.currentDifficulty === "medium") {
      session.currentDifficulty = "hard";
    }
  } else if (percentage < 50) {
    if (session.currentDifficulty === "hard") {
      session.currentDifficulty = "medium";
    } else if (session.currentDifficulty === "medium") {
      session.currentDifficulty = "easy";
    }
  }
};