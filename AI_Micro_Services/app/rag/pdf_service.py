from langchain_community.document_loaders import PyPDFLoader
import requests
import tempfile
import os
def pdf_loader(url:str):
    response = requests.get(url)  # download pdf from Cloudinary/S3 URL
    if response.status_code!=200:
        raise Exception("Pdf not download")
    # create temp pdf file
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp:
        temp.write(response.content)
        pdf_path=temp.name



    loader=PyPDFLoader(
        file_path=pdf_path,
        
    )
    document=loader.load()
    os.remove(pdf_path)
    return document