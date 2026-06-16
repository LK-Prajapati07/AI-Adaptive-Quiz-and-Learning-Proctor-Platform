from pydantic import BaseModel, Field
from typing import Literal


class QuizRequest(BaseModel):

    url: str

    category: Literal[
        "Programming",
        "Aptitude",
        "General Knowledge",
        "Science",
        "Mathematics",
        "English",
        "Interview Preparation"
    ]

    difficulty_level: Literal[
        "Easy",
        "Medium",
        "Hard",
        "Mixed"
    ]

    totalQuestion: int = Field(
        gt=0,
        le=100
    )

    question_type: str