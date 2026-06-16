from google.protobuf import symbol_database
from google.protobuf import message_factory


# Fix protobuf 6 compatibility with MediaPipe solutions API
if not hasattr(
    symbol_database.Default(),
    "GetPrototype"
):
    symbol_database.Default().GetPrototype = (
        message_factory.GetMessageClass
    )
import cv2
import mediapipe as mp
import math
class Liveness:
    def __init__(self):
        self.face_mesh =( mp.solutions.face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True
        )
        )

    """
    calculate the distance between the Eye point 
    """
    def distance(self,p1,p2):
        return math.sqrt(
            (p1.x-p2.x)**2+(p1.y-p2.y)**2
        )
    
    """
    Detected the blinking of eye
    """
    def detect_blink(self,landmarks):
        upper_eye=landmarks[159]
        lower_eye=landmarks[145]
        eye_distance=self.distance(upper_eye,lower_eye)
        if eye_distance<0.01:
            return True
        else:
            return False
        
    def analyze(self,frame):
        risk=0
        warnings=[]

        """
        convert you image into BGR to RGB due to mediapipe required RGB image
        """
        rgb=cv2.cvtColor(
            frame
            ,cv2.COLOR_BGR2RGB
        ) 

        result=self.face_mesh.process(
            rgb
        )
        if not result.multi_face_landmarks:
            risk+=60
            warnings.append("No Live Face Detected")
            return {
                "Service":"LIVENESS",
                "live":False,
                "risk":risk,
                "blink":False,
                "warnings":warnings

            }
        landmarks=(
            result.multi_face_landmarks[0].landmark
        )
        blink=self.detect_blink(landmarks)
        if blink==False:
            risk+=40
            warnings.append(
                "Blink not detected"
            )
        return {
            "service":"LIVENESS",

            "live": risk == 0,

            "blink": blink,

            "risk": risk,

            "warnings": warnings
        }




