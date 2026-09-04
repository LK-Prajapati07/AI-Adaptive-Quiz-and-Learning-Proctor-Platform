from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunking_document(
    documents,
    chunk_size: int = 500,
    chunk_overlap: int = 50
):

    # remove empty pages
    documents = [
        doc
        for doc in documents
        if doc.page_content.strip()
    ]


    if not documents:
        raise Exception(
            "PDF has no extractable text"
        )


    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=[
            "\n\n",
            "\n",
            ".",
            " ",
            ""
        ]
    )


    chunks = text_splitter.split_documents(
        documents
    )


    if not chunks:
        raise Exception(
            "Chunk creation failed"
        )


    print(
        "Total chunks:",
        len(chunks)
    )


    return chunks