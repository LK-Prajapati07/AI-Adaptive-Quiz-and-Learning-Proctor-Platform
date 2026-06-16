import cv2
import numpy as np
import requests

from deepface import DeepFace


class FaceServices:

    def __init__(self):

        self.face_classifier = cv2.CascadeClassifier(
            cv2.data.haarcascades +
            "haarcascade_frontalface_default.xml"
        )


    # -----------------------
    # Detect faces
    # -----------------------
    def detect_faces(
        self,
        frame
    ):

        gray = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2GRAY
        )


        faces = (
            self.face_classifier
            .detectMultiScale(
                gray,
                scaleFactor=1.1,
                minNeighbors=5,
                minSize=(40, 40)
            )
        )


        return faces



    # -----------------------
    # Download Cloudinary image
    # -----------------------
    def load_student_image(
        self,
        student_image_url
    ):

        response = requests.get(
            student_image_url
        )


        if response.status_code != 200:

            raise Exception(
                "Student image download failed"
            )


        image_array = np.frombuffer(
            response.content,
            np.uint8
        )


        image = cv2.imdecode(
            image_array,
            cv2.IMREAD_COLOR
        )


        return image



    # -----------------------
    # Verify student
    # -----------------------
    def verify_student(
        self,
        current_frame,
        student_image_url
    ):

        try:

            student_image = (
                self.load_student_image(
                    student_image_url
                )
            )


            result = DeepFace.verify(
                current_frame,
                student_image,
                enforce_detection=False
            )


            return result[
                "verified"
            ]


        except Exception as e:

            print(e)

            return False



    # -----------------------
    # Main analyzer
    # -----------------------
    def analyze(
        self,
        frame,
        student_image_url
    ):

        risk = 0

        warnings = []


        faces = self.detect_faces(
            frame
        )


        if len(faces) == 0:

            risk += 40

            warnings.append(
                "No face detected"
            )


        elif len(faces) >= 2:

            risk += 60

            warnings.append(
                "Multiple faces detected"
            )


        else:

            verified = (
                self.verify_student(
                    frame,
                    student_image_url
                )
            )


            if not verified:

                risk += 80

                warnings.append(
                    "Different person detected"
                )



        return {

            "service": "FACE",

            "faces": len(faces),

            "risk": risk,

            "warnings": warnings
        }