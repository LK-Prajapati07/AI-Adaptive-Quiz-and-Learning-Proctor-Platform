from pydantic import BaseModel
from typing import List, Optional


class QuestionResponse(BaseModel):

    question: str

    category: str

    options: List[str]

    correctAnswer: Optional[str] = None

    expectedAnswer: Optional[str] = None

    difficulty: str

    explanation: str

    marks: int

    questionType: str



class QuizResponse(BaseModel):

    success: bool

    message: str

    questions: List[QuestionResponse]