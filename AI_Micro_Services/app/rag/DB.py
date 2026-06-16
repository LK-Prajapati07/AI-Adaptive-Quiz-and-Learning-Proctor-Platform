from langchain_chroma import Chroma
from langchain_core.embeddings import Embeddings # Assuming you have an Embeddings class defined in langchain_core.embeddings


def create_chroma(
    embedding: Embeddings,
    collection_name: str = "Quiz_collection",
    persist_directory: str = "./chroma_db"
):

    vector_store = Chroma(
        collection_name=collection_name,
        embedding_function=embedding,
        persist_directory=persist_directory
    )

    return vector_store