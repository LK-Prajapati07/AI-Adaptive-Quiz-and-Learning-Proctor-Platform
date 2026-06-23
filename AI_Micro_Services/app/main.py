from fastapi import FastAPI
import warnings

warnings.filterwarnings("ignore")

from fastapi.middleware.cors import CORSMiddleware
from app.router.evaluation_routes import router as subjective_router
from app.router.quiz_routes import router as quiz_router
from app.router.proctor_router import router as proctor_router
from app.router.evaluation_router import router as evaluate_router


app = FastAPI(
    title="Quiz Project",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


@app.get("/")
def health_check():

    return {
        "status": "AI Service Running"
    }


app.include_router(
    quiz_router
)

app.include_router(
    proctor_router
)

app.include_router(
    evaluate_router
)
app.include_router(
    subjective_router
)