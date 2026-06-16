from app.services.mcq_services import check_mcq
from app.services.fill_blank_service import fill_in_blank_evaluation
from app.services.subjective_service import subjective_evaluation
from app.services.code_service import code_evaluation


def evaluate_quiz(
    question_type: str,
    questions: list
):

    results = []

    total_marks = 0
    obtained_marks = 0
    attempted_questions = 0


    for question in questions:


        total_marks += question.marks


        if question.student_answer:
            attempted_questions += 1



        if (
            question_type == "MCQ"
            or question_type == "TRUE_FALSE"
        ):

            result = check_mcq(
                question.student_answer,
                question.correct_answer,
                question.marks
            )



        elif question_type == "FILL_BLANK":

            result = fill_in_blank_evaluation(
                question.student_answer,
                question.correct_answer,
                question.marks
            )



        elif question_type == "SUBJECTIVE":

            result = subjective_evaluation(
                question.question,
                question.expected_answer,
                question.student_answer,
                question.marks
            )



        elif question_type == "CODE":

            result = code_evaluation(
                question.student_code,
                question.language,
                question.test_cases,
                question.marks
            )



        else:

            result = {
                "is_correct": False,
                "obtained_marks": 0,
                "feedback": "Invalid question type"
            }



        obtained_marks += result["obtained_marks"]


        results.append(
            {

                "question": question.question,

                "student_answer": question.student_answer,

                "is_correct": result["is_correct"],

                "obtained_marks": result["obtained_marks"],

                "total_marks": question.marks,

                "feedback": result["feedback"]
            }
        )



    percentage = (
        obtained_marks / total_marks
    ) * 100



    return {

        "question_type": question_type,

        "total_questions": len(questions),

        "attempted_questions": attempted_questions,

        "total_marks": total_marks,

        "obtained_marks": obtained_marks,

        "percentage": percentage,

        "results": results
    }