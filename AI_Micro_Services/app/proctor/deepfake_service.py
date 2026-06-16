from transformers import pipeline
from PIL import Image
import cv2


class DeepFakeService:

    def __init__(self):

        self.detector = pipeline(
            "image-classification",
            model="prithivMLmods/Deep-Fake-Detector-v2-Model"
        )


    def analyze(self, frame):

        # OpenCV BGR → RGB
        rgb = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )

        # numpy → PIL image
        image = Image.fromarray(rgb)

        result = self.detector(
            image
        )

        fake_score = 0

        for item in result:
            if "fake" in item["label"].lower():
                fake_score = item["score"]

        risk = 0
        warnings = []

        if fake_score > 0.7:
            risk += 80
            warnings.append(
                "Deepfake detected"
            )

        return {
            "service": "DEEPFAKE",
            "fake_score": fake_score,
            "risk": risk,
            "warnings": warnings
        }