from pydantic import BaseModel, Field


class EvaluationRequest(BaseModel):

    question_id: str

    question: str

    expectedAnswer: str

    userAnswer: str

    marks: float