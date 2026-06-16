import string
def fill_in_blank_evaluation(
        student_answer:str,
        correct_answer:str,
        marks:int
):
    obtained_marks=0
    student_answer = (
        student_answer
        .lower()
        .strip()
        .translate(
            str.maketrans(
                "",
                "",
                string.punctuation
            )
        )
    )
    correct_answer = (
        correct_answer
        .lower()
        .strip()
        .translate(
            str.maketrans(
                "",
                "",
                string.punctuation
            )
        )
    )
    if student_answer==correct_answer:
        obtained_marks=marks
   
    return {
         "is_correct": obtained_marks == marks,

        "obtained_marks": obtained_marks,

        "feedback": (
            "Correct answer"
            if obtained_marks == marks
            else "Wrong answer"
        )
    }
         