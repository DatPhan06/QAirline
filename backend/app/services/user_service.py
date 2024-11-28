from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .. import models, schemas
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Xác minh mật khẩu.

    Args:
        plain_password (str): Mật khẩu gốc.
        hashed_password (str): Mật khẩu đã được băm.

    Returns:
        bool: True nếu mật khẩu khớp, ngược lại False.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Băm mật khẩu.
    Args:
        password (str): Mật khẩu gốc.
    Returns:
        str: Mật khẩu đã được băm.
    """
    return pwd_context.hash(password)

def get_user_by_email(db: Session, email: str) -> models.User:
    """
    Lấy thông tin người dùng bằng email.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        email (str): Địa chỉ email của người dùng.

    Returns:
        models.User: Thông tin người dùng nếu tìm thấy, ngược lại None.
    """
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    """
    Lấy thông tin người dùng dựa trên tên đăng nhập.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        username (str): Tên đăng nhập của người dùng cần tìm.

    Returns:
        Optional[models.User]: Đối tượng người dùng nếu tìm thấy, ngược lại None.
    """
    return db.query(models.User).filter(models.User.username == username).first()


def get_user(db: Session, user_id: int) -> Optional[models.User]:
    """
    Lấy thông tin người dùng dựa trên ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user_id (int): ID của người dùng cần tìm.

    Returns:
        Optional[models.User]: Đối tượng người dùng nếu tìm thấy, ngược lại None.
    """
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_users(db: Session) -> List[models.User]:
    """
    Lấy danh sách tất cả người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.User]: Danh sách người dùng.
    """
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """
    Tạo mới một người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user (schemas.UserCreate): Thông tin người dùng cần tạo.

    Raises:
        HTTPException: Nếu email hoặc tên đăng nhập đã tồn tại.

    Returns:
        models.User: Đối tượng người dùng mới được tạo.
    """
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email đã được đăng ký",
        )
    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tên đăng nhập đã được sử dụng",
        )
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str) -> models.User:
    """
    Xác thực người dùng khi đăng nhập.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        username (str): Tên đăng nhập do người dùng cung cấp.
        password (str): Mật khẩu do người dùng cung cấp.

    Raises:
        HTTPException: Nếu thông tin đăng nhập không chính xác.

    Returns:
        models.User: Đối tượng người dùng đã được xác thực.
    """
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không đúng",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không đúng",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Tạo mã thông báo truy cập (JWT) cho người dùng.

    Args:
        data (dict): Dữ liệu sẽ được mã hóa trong token.
        expires_delta (Optional[timedelta], optional): Thời gian hết hạn của token.

    Returns:
        str: Mã thông báo truy cập đã được mã hóa.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate) -> models.User:
    """
    Cập nhật thông tin người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user_id (int): ID của người dùng cần cập nhật.
        user_update (schemas.UserUpdate): Thông tin mới của người dùng.

    Raises:
        HTTPException: Nếu người dùng không tồn tại.

    Returns:
        models.User: Đối tượng người dùng đã được cập nhật.
    """
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Người dùng không tồn tại",
        )
    update_data = user_update.dict(exclude_unset=True)
    if "password" in update_data:
        # Băm mật khẩu mới trước khi lưu
        update_data["hashed_password"] = get_password_hash(update_data["password"])
        del update_data["password"]
    for key, value in update_data.items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> dict:
    """
    Xóa người dùng khỏi cơ sở dữ liệu.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        user_id (int): ID của người dùng cần xóa.

    Raises:
        HTTPException: Nếu người dùng không tồn tại.

    Returns:
        dict: Thông báo xác nhận đã xóa.
    """
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Người dùng không tồn tại",
        )
    db.delete(db_user)
    db.commit()
    return {"detail": "Đã xóa người dùng thành công"}