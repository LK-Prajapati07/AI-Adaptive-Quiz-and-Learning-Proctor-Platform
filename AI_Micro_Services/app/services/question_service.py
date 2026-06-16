import json

from app.rag.chunk_service import chunking_document
from app.rag.DB import create_chroma
from app.rag.embedding import get_embedding
from app.rag.pdf_service import pdf_loader
from app.rag.retriever_service import retrieve_context

from app.AI.mistral_service import get_llm
from app.AI.prompt_service import quiz_generation_prompt

from app.services.difficulty_service import balance_difficulty


def generate_questions(
    quiz_request
):

    # 1. Load PDF
    documents = pdf_loader(
        quiz_request.url
    )


    # 2. Split documents
    chunks = chunking_document(
        documents
    )


    # 3. Create embeddings
    embedding = get_embedding()


    # 4. Create vector DB
    vector_store = create_chroma(
        embedding
    )


    # 5. Save chunks
    vector_store.add_documents(
        chunks
    )


    # 6. Retrieve context
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


    # 9. Convert AI JSON string
    questions = json.loads(
        response.content
    )


    # 10. Mixed difficulty balance
    if (
        quiz_request.difficulty_level
        ==
        "Mixed"
    ):
        questions = balance_difficulty(
            questions,
            quiz_request.totalQuestion
        )


   
    return {
        "success": True,
        "message": "Questions generated successfully",
        "questions": questions
    }