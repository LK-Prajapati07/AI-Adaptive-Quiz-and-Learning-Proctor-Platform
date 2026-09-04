from fastapi import APIRouter

from app.schemas.subjective_request import (
    EvaluationRequest,
)
from app.schemas.subjective_responce import EvaluationResponse

from app.services.subjective_services import (evaluationServices
    
)


router = APIRouter(
    prefix="/evaluation",
    tags=["Evaluation"]
)



@router.post(
    "/answer",
    response_model=EvaluationResponse
)
def evaluate(
    request: EvaluationRequest
):


    result = evaluationServices(
        request
    )


    return result