from fastapi import APIRouter, HTTPException
from openai import OpenAI
import os

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/")
async def chat(message: str):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful customer service assistant for QAirline."},
                {"role": "user", "content": message}
            ]
        )
        return {"message": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))