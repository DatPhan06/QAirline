from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from jose import JWTError, jwt
from passlib.context import CryptContext
from .. import models, schemas, database, services
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..services.user_service import (
    verify_password,
    get_password_hash,
    get_user_by_email,
    authenticate_user,
)
from ..config import settings

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

# Cài đặt bảo mật
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")


@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)) -> models.User:
    """
    Đăng ký người dùng mới.

    :param user: Thông tin người dùng cần đăng ký.
    :param db: Phiên làm việc với cơ sở dữ liệu.
    :return: Thông tin người dùng đã đăng ký.
    """
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email đã được đăng ký")
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
) -> dict:
    """
    Đăng nhập người dùng.

    :param form_data: Dữ liệu đăng nhập của người dùng.
    :param db: Phiên làm việc với cơ sở dữ liệu.
    :return: Token truy cập và loại token.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email hoặc mật khẩu không đúng",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.encode(
        {"sub": user.email, "exp": datetime.utcnow() + access_token_expires},
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(services.get_current_user)) -> models.User:
    """
    Lấy thông tin người dùng hiện tại.

    :param current_user: Người dùng hiện tại.
    :return: Thông tin người dùng hiện tại.
    """
    return current_user