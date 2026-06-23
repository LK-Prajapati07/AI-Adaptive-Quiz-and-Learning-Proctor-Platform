export const getNextQuestion = (session) => {


  const findQuestion = (difficulty) => {

    const pool = session[difficulty] || [];


    return pool.find(

      (q) =>
        !session.attempted.includes(
          q._id.toString()
        )

    );

  };



  // 1. Try current difficulty

  let question =
    findQuestion(
      session.currentDifficulty
    );



  if(question){

    return question;

  }




  // 2. Fallback difficulties

  const difficulties = [
    "Medium",
    "Easy",
    "Hard"
  ];



  for(
    const difficulty of difficulties
  ){

    question =
      findQuestion(difficulty);


    if(question){

      session.currentDifficulty =
        difficulty;


      return question;

    }

  }



  // no question left

  return null;

};