from fastapi import APIRouter

from app.schemas.evaluation_request import EvaluationRequest
from app.schemas.evaluation_response import EvaluationResponse

from app.services.evaluation_service import evaluate_quiz


router = APIRouter(
    prefix="/evaluation",
    tags=["Evaluation"]
)


@router.post(
    "/check",
    response_model=EvaluationResponse
)
def evaluation(
    request: EvaluationRequest
):

    result = evaluate_quiz(
    request.question_type,
    request.questions
)

    return {

        "success": True,

        "message": "Evaluation completed successfully",

        "evaluation": result
    }