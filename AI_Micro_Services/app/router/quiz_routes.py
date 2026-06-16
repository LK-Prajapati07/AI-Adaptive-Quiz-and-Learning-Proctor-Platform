from fastapi import APIRouter
from app.schemas.request import QuizRequest
from app.schemas.responce import QuizResponse
from app.services.question_service import generate_questions

router=APIRouter(
    prefix="/quiz",
    tags=["Quiz"]
)
@router.post(
    "/generate",
    response_model=QuizResponse
)
def generate_quiz(request:QuizRequest):
    result=generate_questions(request)
    return result