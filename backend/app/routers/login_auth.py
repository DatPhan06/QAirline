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

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI")

FRONTEND_URL = os.getenv("FRONTEND_URL")

@router.get("/google/login")
async def google_login():
    """
    Tạo URL để người dùng đăng nhập bằng Google OAuth2 và chuyển hướng họ đến đó.

    Returns:
        RedirectResponse: Phản hồi chuyển hướng người dùng đến trang đăng nhập Google.
    """
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
    """
    Xử lý phản hồi từ Google sau khi người dùng đăng nhập, tạo hoặc cập nhật người dùng trong cơ sở dữ liệu.

    Args:
        request (Request): Yêu cầu HTTP nhận được từ Google, chứa mã ủy quyền.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không có mã ủy quyền trong yêu cầu.

    Returns:
        RedirectResponse: Phản hồi chuyển hướng người dùng về frontend với token xác thực.
    """
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


@router.get("/github/login")
async def github_login():
    """
    Tạo URL để người dùng đăng nhập bằng GitHub OAuth2 và chuyển hướng họ đến đó.

    Returns:
        RedirectResponse: Phản hồi chuyển hướng người dùng đến trang đăng nhập GitHub.
    """
    authorization_url = (
        "https://github.com/login/oauth/authorize"
        "?client_id={client_id}"
        "&redirect_uri={redirect_uri}"
        "&scope={scope}"
    ).format(
        client_id=GITHUB_CLIENT_ID,
        redirect_uri=GITHUB_REDIRECT_URI,
        scope="user:email",
    )
    return RedirectResponse(url=authorization_url)

@router.get("/github/callback")
async def github_callback(request: Request, db: Session = Depends(get_db)):
    """
    Xử lý phản hồi từ GitHub sau khi người dùng đăng nhập, tạo hoặc cập nhật người dùng trong cơ sở dữ liệu.

    Args:
        request (Request): Yêu cầu HTTP nhận được từ GitHub, chứa mã ủy quyền.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không có mã ủy quyền trong yêu cầu.

    Returns:
        RedirectResponse: Phản hồi chuyển hướng người dùng về frontend với token xác thực.
    """
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Code not provided")

    token_url = "https://github.com/login/oauth/access_token"
    token_data = {
        "client_id": GITHUB_CLIENT_ID,
        "client_secret": GITHUB_CLIENT_SECRET,
        "code": code,
        "redirect_uri": GITHUB_REDIRECT_URI,
    }
    headers = {"Accept": "application/json"}
    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=token_data, headers=headers)
        token_json = token_response.json()
        access_token = token_json.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="Access token not provided")

        # Lấy thông tin người dùng từ GitHub
        userinfo_url = "https://api.github.com/user"
        headers = {"Authorization": f"Bearer {access_token}"}
        userinfo_response = await client.get(userinfo_url, headers=headers)
        userinfo = userinfo_response.json()

        # Lấy email người dùng từ GitHub
        emails_url = "https://api.github.com/user/emails"
        emails_response = await client.get(emails_url, headers=headers)
        emails = emails_response.json()
        email = next((email["email"] for email in emails if email["primary"]), None)

    # Xử lý dữ liệu người dùng
    username = userinfo.get("login")
    full_name = userinfo.get("name")
    github_id = userinfo.get("id")  # Sử dụng làm mật khẩu (chưa hash)

    if not email:
        raise HTTPException(status_code=400, detail="Email not provided by GitHub")

    # Kiểm tra xem người dùng đã tồn tại chưa
    user = services.user_service.get_user_by_email(db, email)
    if not user:
        # Hash mật khẩu từ github_id
        hashed_password = services.user_service.get_password_hash(github_id)
        user_create = schemas.UserCreate(
            username=username,
            email=email,
            full_name=full_name,
            password=github_id,  # Sẽ được hash trong create_user
        )
        user = services.user_service.create_user(db, user_create, hashed_password=hashed_password)

    # Tạo JWT token
    token = services.user_service.create_access_token(data={"sub": user.username})

    # Redirect đến frontend với token
    return RedirectResponse(f"{FRONTEND_URL}/oauth2/callback?token={token}")