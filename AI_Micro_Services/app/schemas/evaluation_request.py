from pydantic import BaseModel
from typing import List, Optional


class TestCase(BaseModel):

    input: str

    output: str



class QuestionEvaluation(BaseModel):

    question: str

    student_answer: Optional[str]

    marks: int


    # MCQ
    options: Optional[List[str]] = None


    # MCQ / TRUE_FALSE / FILL_BLANK
    correct_answer: Optional[str] = None


    # SUBJECTIVE
    expected_answer: Optional[str] = None


    # CODE
    language: Optional[str] = None

    student_code: Optional[str] = None

    test_cases: Optional[List[TestCase]] = None



class EvaluationRequest(BaseModel):

    question_type: str

    questions: List[QuestionEvaluation]