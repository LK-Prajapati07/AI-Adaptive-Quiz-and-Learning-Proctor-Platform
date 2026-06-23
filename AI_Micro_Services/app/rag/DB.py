from langchain_chroma import Chroma
from langchain_core.embeddings import Embeddings
import uuid


def create_chroma(
    embedding: Embeddings
):

    vector_store = Chroma(
        collection_name=f"quiz_{uuid.uuid4().hex}",
        embedding_function=embedding
    )

    return vector_store