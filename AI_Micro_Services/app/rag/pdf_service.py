from langchain_community.document_loaders import PyPDFLoader

import requests
import tempfile
import os
import re


def normalize_url(url: str) -> str:
    """
    Convert Google Drive sharing URL into direct download URL.
    Cloudinary/S3 URLs are returned unchanged.
    """

    if "drive.google.com" in url:

        match = re.search(
            r"/d/([^/]+)",
            url
        )

        if match:
            file_id = match.group(1)

            return (
                "https://drive.google.com/uc"
                f"?export=download&id={file_id}"
            )

    return url



def download_pdf(url: str) -> str:
    """
    Download PDF from URL and save into temporary file.
    Returns temporary file path.
    """

    url = normalize_url(url)

    print("Downloading PDF:", url)


    response = requests.get(
        url,
        timeout=30
    )


    print(
        "Status Code:",
        response.status_code
    )


    if response.status_code != 200:
        raise Exception(
            f"PDF download failed: {response.status_code}"
        )


    content_type = response.headers.get(
        "content-type",
        ""
    )


    print(
        "Content Type:",
        content_type
    )


    # Verify actual PDF bytes
    if not response.content.startswith(b"%PDF"):

        raise Exception(
            "URL response is not a valid PDF"
        )


    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )


    try:

        temp_file.write(
            response.content
        )

        temp_file.close()

        return temp_file.name


    except Exception as error:

        temp_file.close()

        os.remove(
            temp_file.name
        )

        raise error




def pdf_loader(url: str):

    pdf_path = None


    try:

        # download PDF
        pdf_path = download_pdf(url)


        # load PDF pages
        loader = PyPDFLoader(
            file_path=pdf_path
        )


        documents = loader.load()


        if not documents:

            raise Exception(
                "PDF has no readable content"
            )


        print(
            "PDF Pages Loaded:",
            len(documents)
        )


        return documents



    finally:

        # remove temp pdf
        if pdf_path and os.path.exists(pdf_path):

            os.remove(
                pdf_path
            )