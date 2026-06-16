class RiskService:

    def calculate(
        self,
        face_result,
        liveness_result,
        object_result,
        deepfake_result
    ):

        total_risk = 0

        warnings = []


        # Face
        total_risk += face_result.get(
            "risk",
            0
        )

        warnings.extend(
            face_result.get(
                "warnings",
                []
            )
        )


        # Liveness
        total_risk += liveness_result.get(
            "risk",
            0
        )

        warnings.extend(
            liveness_result.get(
                "warnings",
                []
            )
        )


        # Object
        total_risk += object_result.get(
            "risk",
            0
        )

        warnings.extend(
            object_result.get(
                "warnings",
                []
            )
        )


        # Deepfake
        total_risk += deepfake_result.get(
            "risk",
            0
        )

        warnings.extend(
            deepfake_result.get(
                "warnings",
                []
            )
        )


        # max score limit
        total_risk = min(
            total_risk,
            100
        )


        if total_risk >= 80:

            status = "CHEATING"

        elif total_risk >= 40:

            status = "WARNING"

        else:

            status = "NORMAL"



        return {

            "service": "RISK",

            "riskScore": total_risk,

            "status": status,

            "warnings": warnings
        }