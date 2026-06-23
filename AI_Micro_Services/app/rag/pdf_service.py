from langchain_community.document_loaders import PyPDFLoader

import requests
import tempfile
import os
import re


def normalize_url(url: str):

    # Only for testing Google Drive
    if "drive.google.com" in url:

        match = re.search(
            r"/d/([^/]+)",
            url
        )

        if match:
            file_id = match.group(1)

            return (
                "https://drive.google.com/uc?"
                f"export=download&id={file_id}"
            )


    # Cloudinary / S3
    return url



def pdf_loader(url: str):


    url = normalize_url(url)


    response = requests.get(
        url
    )


    if response.status_code != 200:
        raise Exception(
            "PDF not downloaded"
        )


    # check real PDF bytes
    if not response.content.startswith(b"%PDF"):

        raise Exception(
            "URL is not returning PDF file"
        )



    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp:

        temp.write(
            response.content
        )

        pdf_path = temp.name



    try:

        loader = PyPDFLoader(
            file_path=pdf_path
        )


        documents = loader.load()


    finally:

        os.remove(
            pdf_path
        )



    return documents