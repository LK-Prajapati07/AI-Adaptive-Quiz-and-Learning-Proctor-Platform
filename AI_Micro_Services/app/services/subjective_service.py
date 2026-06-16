import json
import re

from app.AI.evaluation_prompt import subjective_evaluation_prompt
from app.AI.mistral_service import get_llm


def subjective_evaluation(
    question: str,
    expected_answer: str,
    student_answer: str,
    marks: int
):

    llm = get_llm()


    prompt = subjective_evaluation_prompt(
        question,
        expected_answer,
        student_answer,
        marks
    )


    response = llm.invoke(
        prompt
    )


    content = response.content


    # extract JSON only
    match = re.search(
        r"\{.*\}",
        content,
        re.DOTALL
    )


    if not match:

        return {
            "is_correct": False,
            "obtained_marks": 0,
            "feedback": "AI evaluation failed"
        }


    result = json.loads(
        match.group()
    )


    return {

        "is_correct":
            result["is_correct"],


        "obtained_marks":
            result["obtained_marks"],


        "feedback":
            result["feedback"]
    }