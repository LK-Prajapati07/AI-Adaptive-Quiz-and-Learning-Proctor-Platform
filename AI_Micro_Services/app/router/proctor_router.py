from fastapi import APIRouter, UploadFile, File, Form

import cv2
import numpy as np

from app.services.proctor_service import ProctorService


router = APIRouter(
    prefix="/proctor",
    tags=["Proctor"]
)


# load AI models once
proctor_service = ProctorService()



@router.post("/analyze")
async def analyze_proctor(

    frame: UploadFile = File(...),

    student_image_url: str = Form(...)

):

    """
    frame:
        current webcam image

    student_image_url:
        Cloudinary profile photo URL
    """


    # -------------------------
    # Read image bytes
    # -------------------------

    image_bytes = await frame.read()



    # -------------------------
    # Convert bytes to numpy
    # -------------------------

    np_array = np.frombuffer(
        image_bytes,
        np.uint8
    )



    # -------------------------
    # Convert numpy to OpenCV image
    # -------------------------

    current_frame = cv2.imdecode(
        np_array,
        cv2.IMREAD_COLOR
    )



    # -------------------------
    # Run proctor AI
    # -------------------------

    result = (
        proctor_service.analyze(
            current_frame,
            student_image_url
        )
    )



    return result