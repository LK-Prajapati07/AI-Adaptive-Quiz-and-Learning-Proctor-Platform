from langchain_text_splitters import RecursiveCharacterTextSplitter
def chunking_document(
        documents,
        chunk_size: int = 500,
        chunk_overlap: int = 50
):
    text_splitter=RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    chunks=text_splitter.split_documents(documents)
    return chunks