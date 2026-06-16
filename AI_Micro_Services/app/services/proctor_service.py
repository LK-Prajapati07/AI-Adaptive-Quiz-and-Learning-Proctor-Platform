from app.proctor.face_service import FaceServices
from app.proctor.liveness_services import Liveness
from app.proctor.object_service import Object_services
from app.proctor.deepfake_service import DeepFakeService


class ProctorService:

    def __init__(self):

        self.face = FaceServices()

        self.liveness = Liveness()

        self.object = Object_services()

        self.deepfake = DeepFakeService()


    def analyze(
        self,
        frame,
        student_image_url
    ):

        face_result = self.face.analyze(
            frame,
            student_image_url
        )


        live_result = self.liveness.analyze(
            frame
        )


        object_result = self.object.analyze(
            frame
        )


        deepfake_result = self.deepfake.analyze(
            frame
        )


        total_risk = (
            face_result["risk"]
            +
            live_result["risk"]
            +
            object_result["risk"]
            +
            deepfake_result["risk"]
        )


        return {

            "status":
                "CHEATING"
                if total_risk >= 70
                else "NORMAL",

            "total_risk": total_risk,

            "checks": {

                "face": face_result,

                "liveness": live_result,

                "object": object_result,

                "deepfake": deepfake_result
            }
        }