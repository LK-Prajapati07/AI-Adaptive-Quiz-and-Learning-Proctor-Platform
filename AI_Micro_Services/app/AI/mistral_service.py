from langchain_mistralai import ChatMistralAI
from dotenv import load_dotenv
import os

load_dotenv()


def get_llm():

    MISTRAL_API_KEY = os.getenv(
        "MISTRAL_API_KEY"
    )


    llm = ChatMistralAI(

        model="mistral-large-latest",

        temperature=0.5,

        api_key=MISTRAL_API_KEY,


        # wait longer for big quiz generation
        timeout=120,


        # retry if network slow
        max_retries=3

    )


    return llm