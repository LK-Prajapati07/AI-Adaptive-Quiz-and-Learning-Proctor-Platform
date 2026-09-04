from sklearn.metrics.pairwise import cosine_similarity
import json
from app.AI.mistral_service import get_llm
from app.rag.embedding import get_embedding



def evaluationServices(request):


    user_answer = (
        request.userAnswer
        .lower()
        .strip()
    )


    expected_answer = (
        request.expectedAnswer
        .lower()
        .strip()
    )



    embedding = get_embedding()



    expected_vector = embedding.embed_query(
        expected_answer
    )


    user_vector = embedding.embed_query(
        user_answer
    )



    similarity = cosine_similarity(
        [user_vector],
        [expected_vector]
    )[0][0]



    similarity = round(
        float(similarity),
        2
    )



    # High confidence

    if similarity >= 0.75:

        return {

            "question_id": request.question_id,

            "score": request.marks,

            "maxScore": request.marks,

            "similarityScore": similarity,

            "isCorrect": True,

            "evaluationMethod": "Embedding",

            "feedback": "Answer is correct"

        }




    # Clearly wrong

    if similarity <= 0.45:

        return {

            "question_id": request.question_id,

            "score": 0,

            "maxScore": request.marks,

            "similarityScore": similarity,

            "isCorrect": False,

            "evaluationMethod": "EMBEDDING",

            "feedback":
            "Answer does not match expected concepts"

        }





    # uncertain area -> LLM

    llm = get_llm()


    prompt = f"""
You are an exam evaluator.

Question:
{request.question}

Expected Answer:
{expected_answer}

Student Answer:
{user_answer}

Maximum Marks:
{request.marks}


Evaluate the answer.

Return ONLY JSON:

{{
"score": number,
"isCorrect": boolean,
"feedback": "short feedback"
}}
"""


    response = llm.invoke(
        prompt
    )
    result = parse_llm_json(response)
    return {
        "question_id":
        request.question_id,
        "score":
        result["score"],
        "maxScore":
        request.marks,
        "similarityScore":
        similarity,
        "isCorrect":
        result["isCorrect"],
        "evaluationMethod":
        "LLM",
        "feedback":
        result["feedback"]

    }

def parse_llm_json(response):

    raw = response.content

    raw = (
        raw
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(raw)