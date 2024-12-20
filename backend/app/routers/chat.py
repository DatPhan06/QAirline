from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from openai import OpenAI
from .. import models, schemas, services
from ..database import get_db
import os

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@router.post("/")
async def chat(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    try:
        flights = services.flight_service.get_flights(db)
        # flight_details = "\n".join([
        #     {flight}
        #     for flight in flights
        # ])
        

        # Include the retrieved data in the conversation context
        messages = [
            {"role": "system", "content": """Bạn là trợ lý dịch vụ khách hàng hữu ích cho QAirline. 
                Hãy trả lời bằng tiếng Việt để tư vấn cho khách hàng về hãng bay."""},
            {"role": "assistant", "content": f"""Thông tin về trang web hiện tại:{request.context}.
             Hãy dựa vào nội dung trang web và phân tích để trả lời."""},
            {"role": "user", "content": request.message}
        ]

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        return {"message": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))