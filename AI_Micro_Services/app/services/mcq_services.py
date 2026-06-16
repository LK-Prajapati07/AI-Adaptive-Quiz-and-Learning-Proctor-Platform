def check_mcq(
        student_answer:str,
        correct_answer:str,
        marks:int
):
    obtained_marks =0
    student_answer=student_answer.lower().strip()
    correct_answer=correct_answer.lower().strip()
    if student_answer==correct_answer:
        obtained_marks =marks
    else:
        obtained_marks =0
    return{
        "is_correct": obtained_marks == marks,

        "obtained_marks": obtained_marks,

        "feedback": (
            "Correct answer"
            if obtained_marks == marks
            else "Wrong answer"
        )
    }    