def subjective_evaluation_prompt(
    question: str,
    expected_answer: str,
    student_answer: str,
    marks: int
):
    return f"""
You are an expert answer evaluator.

Evaluate the student's answer based on meaning and concept correctness.

Do not require exact word matching.

QUESTION:
{question}


EXPECTED ANSWER:
{expected_answer}


STUDENT ANSWER:
{student_answer}


MAX MARKS:
{marks}


EVALUATION RULES:

- Check conceptual correctness
- Check completeness
- Ignore grammar mistakes if meaning is correct
- Do not give marks for unrelated answers
- Award partial marks when answer is partially correct
- Obtained marks must be between 0 and {marks}


Return ONLY valid JSON.
Do not include markdown or explanation outside JSON.


{{
    "is_correct": true,

    "obtained_marks": 0,

    "feedback": ""
}}
"""