from ultralytics import YOLO
class Object_services:
    def __init__(self):
        self.model=YOLO(
            "yolo11n.pt"
        )
        self.blocked={
            "cell phone":60,
            "book":40,
            "laptop":30,
            "tv":40
        }
    def detect_Object(self,frame):
        detect=[]
        results=self.model(
            frame,
            verbose=False
        )
        for result in results:
            for box in result.boxes:
                class_id=int(box.cls[0]
                )
                object_name=(
                    self.model.names[class_id]
                )
                confidence=float(
                    box.conf[0]
                )
                if confidence>0.5:
                    detect.append(object_name)
        return detect
    """
    Analyze cheating objects
    """
    def analyze(self,frame):
        risk=0
        warnings=[]
        objects=self.detect_Object(frame)
        for obj in objects:
            if obj in self.blocked:
                risk+=(self.blocked[obj])
                warnings.append(
                    f"{obj} detected"
                )

        return {
            "service":"OBJECT",

            "objects":objects,

            "risk":risk,

            "warnings":warnings
        }