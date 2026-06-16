from dotenv import load_dotenv
from langchain_mistralai import MistralAIEmbeddings
import os
load_dotenv()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
def get_embedding():
    embedding=MistralAIEmbeddings(
        model='mistral-embed',
        api_key=MISTRAL_API_KEY
    )
    return embedding