from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.models import User
from app.database import get_db
from app.config import settings

# OAuth2PasswordBearer cho cơ chế xác thực
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

# Hàm lấy thông tin người dùng hiện tại từ token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Xác thực và trả về người dùng hiện tại dựa trên token.

    Args:
        token (str): Mã thông báo xác thực.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không thể xác thực thông tin hoặc người dùng không tồn tại.
    """
    # Xác định lỗi xác thực
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Giải mã token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Lấy thông tin người dùng từ cơ sở dữ liệu
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user
