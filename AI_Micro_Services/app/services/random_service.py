import random


def randomize_questions(
    questions: list,
    total_questions: int
):

    # shuffle question order
    random.shuffle(questions)


    selected_questions = questions[
        :total_questions
    ]


    # shuffle MCQ options
    for question in selected_questions:

        options = question.get(
            "options",
            []
        )

        random.shuffle(options)

        question["options"] = options


    return selected_questions