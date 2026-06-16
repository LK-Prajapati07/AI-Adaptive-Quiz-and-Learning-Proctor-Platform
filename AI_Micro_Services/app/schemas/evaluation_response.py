from pydantic import BaseModel
from typing import List


class QuestionResult(BaseModel):

    question: str

    student_answer: str

    is_correct: bool

    obtained_marks: int

    total_marks: int

    feedback: str



class EvaluationResult(BaseModel):

    question_type: str

    total_questions: int

    attempted_questions: int

    total_marks: int

    obtained_marks: int

    percentage: float

    results: List[QuestionResult]



class EvaluationResponse(BaseModel):

    success: bool

    message: str

    evaluation: EvaluationResult