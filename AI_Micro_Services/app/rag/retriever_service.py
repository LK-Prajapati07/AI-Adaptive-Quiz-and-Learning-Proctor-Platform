def retrieve_context(
    vector_store,
    category: str,
    difficulty: str
):

    query = f"""
    Find content for quiz generation.

    Category: {category}

    Difficulty: {difficulty}

    Generate relevant quiz questions.
    """


    documents = vector_store.similarity_search(
        query=query,
        k=5
    )


    context = "\n\n".join(
        [
            doc.page_content
            for doc in documents
        ]
    )


    return context