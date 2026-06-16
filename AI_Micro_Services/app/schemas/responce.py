from pydantic import BaseModel
from typing import List
class QuestionResponse(BaseModel):
    question: str
    category: str
    options: List[str]
    correctAnswer: str
    difficulty: str
    explanation: str
    marks: int
    questionType: str


class QuizResponse(BaseModel):
    success: bool
    message: str
    questions: List[QuestionResponse]


#  Response

# success
# message

# questions [
#     {
#       question
#       category
#       options
#       correctAnswer
#       difficulty
#       explanation
#       marks
#       questionType
#     }
# ]

# metadata