def balance_difficulty(
    questions: list,
    total_questions: int
):

    easy = []
    medium = []
    hard = []


    for question in questions:

        level = question.get(
            "difficulty",
            ""
        ).lower()


        if level == "easy":
            easy.append(question)

        elif level == "medium":
            medium.append(question)

        elif level == "hard":
            hard.append(question)


    easy_count = int(
        total_questions * 0.3
    )

    medium_count = int(
        total_questions * 0.5
    )

    hard_count = (
        total_questions
        -
        easy_count
        -
        medium_count
    )


    final_questions = (
        easy[:easy_count]
        +
        medium[:medium_count]
        +
        hard[:hard_count]
    )


    return final_questions