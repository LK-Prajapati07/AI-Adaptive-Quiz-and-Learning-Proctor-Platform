export const updateDifficulty = (session, evaluation) => {
  const percentage =
    (evaluation.score / evaluation.maxScore) * 100;

  switch (session.currentDifficulty) {
    case "Easy":
      if (percentage >= 80) {
        session.currentDifficulty = "Medium";
      }
      break;

    case "Medium":
      if (percentage >= 80) {
        session.currentDifficulty = "Hard";
      } else if (percentage < 50) {
        session.currentDifficulty = "Easy";
      }
      break;

    case "Hard":
      if (percentage < 50) {
        session.currentDifficulty = "Medium";
      }
      break;

    default:
      session.currentDifficulty = "Medium";
  }
};