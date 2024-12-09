from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
import os

from ..database import get_db
from .. import services, schemas

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
FRONTEND_URL = os.getenv("FRONTEND_URL")

@router.get("/google/login")
async def google_login():
    authorization_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?client_id={client_id}"
        "&response_type=code"
        "&redirect_uri={redirect_uri}"
        "&scope={scope}"
        "&access_type=offline"
    ).format(
        client_id=GOOGLE_CLIENT_ID,
        redirect_uri=GOOGLE_REDIRECT_URI,
        scope="openid email profile",
    )
    return RedirectResponse(url=authorization_url)

@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Code not provided")

    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": GOOGLE_REDIRECT_URI,
    }
    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=token_data)
        token_json = token_response.json()
        access_token = token_json.get("access_token")

        # Lấy thông tin người dùng
        userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        userinfo_response = await client.get(userinfo_url, headers=headers)
        userinfo = userinfo_response.json()
        # print(userinfo)

    email = userinfo.get("email")
    full_name = userinfo.get("name")
    google_id = userinfo.get("id")  # Sử dụng làm mật khẩu ban đầu

    # Kiểm tra xem người dùng đã tồn tại chưa
    user = services.user_service.get_user_by_email(db, email)
    if not user:
        user_create = schemas.UserCreate(
            username=email,
            email=email,
            full_name=full_name,
            password=google_id,
        )
        user = services.user_service.create_user(db, user_create)

    token = services.user_service.create_access_token(data={"sub": user.username})

    # Redirect đến frontend với token
    frontend_url = os.getenv("FRONTEND_URL")
    return RedirectResponse(f"{frontend_url}/oauth2/callback?token={token}")