import json

from app.rag.chunk_service import chunking_document
from app.rag.DB import create_chroma
from app.rag.embedding import get_embedding
from app.rag.pdf_service import pdf_loader
from app.rag.retriever_service import retrieve_context

from app.AI.mistral_service import get_llm
from app.AI.prompt_service import quiz_generation_prompt

from app.services.difficulty_service import balance_difficulty



def generate_questions(quiz_request):


    # 1. Load PDF
    documents = pdf_loader(
        quiz_request.url
    )





    # 2. Split PDF into chunks
    chunks = chunking_document(
        documents
    )




    # 3. Load embedding model
    embedding = get_embedding()



    # 4. Create Chroma vector DB
    vector_store = create_chroma(
        embedding
    )



    # 5. Convert chunks to embeddings + save
    vector_store.add_documents(
        chunks
    )



    # 6. Retrieve relevant context
    context = retrieve_context(
        vector_store,
        quiz_request.category,
        quiz_request.difficulty_level
    )


   # 7. Create prompt
    prompt = quiz_generation_prompt(
        context,
        quiz_request.category,
        quiz_request.difficulty_level,
        quiz_request.totalQuestion,
        quiz_request.question_type
    )



    # 8. Call Mistral
    llm = get_llm()


    response = llm.invoke(
        prompt
    )



    # 9. Convert JSON
    questions = json.loads(
        response.content
    )



    # 10. Validate questions

    for question in questions:


        question["question"] = (
            question.get("question")
            or
            ""
        )


        question["category"] = (
            question.get("category")
            or
            quiz_request.category
        )


        question["questionType"] = (
            question.get("questionType")
            or
            quiz_request.question_type
        )


        question["options"] = (
            question.get("options")
            or
            []
        )


        question["correctAnswer"] = (
            question.get("correctAnswer")
        )


        question["expectedAnswer"] = (
            question.get("expectedAnswer")
        )


        question["difficulty"] = (
            question.get("difficulty")
            or
            quiz_request.difficulty_level
        )


        question["explanation"] = (
            question.get("explanation")
            or
            ""
        )


        question["marks"] = (
            question.get("marks")
            or
            1
        )




    # 11. Limit questions

    questions = questions[
        :quiz_request.totalQuestion
    ]



    # 12. Balance Mixed difficulty

    if quiz_request.difficulty_level == "Mixed":

        questions = balance_difficulty(
            questions,
            quiz_request.totalQuestion
        )




    return {

        "success": True,

        "message":
        "Questions generated successfully",

        "questions": questions

    }