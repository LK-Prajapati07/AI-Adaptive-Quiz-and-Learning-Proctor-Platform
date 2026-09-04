from typing import Literal
from pydantic import BaseModel
class EvaluationResponse(BaseModel):
    question_id:str
    score:float
    maxScore:float
    similarityScore:float
    isCorrect:bool
    evaluationMethod:Literal[
        "Embedding",
        "LLM"
    ]
    feedback:str 