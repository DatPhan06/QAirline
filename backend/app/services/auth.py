from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from .. import models
from ..config import settings
from ..database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")
oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/admin/login")


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> models.User:
    """
    Lấy thông tin người dùng hiện tại dựa trên JWT token.

    Args:
        token (str): JWT token từ người dùng.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu token không hợp lệ hoặc không tìm thấy người dùng.

    Returns:
        models.User: Thông tin người dùng hiện tại.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: Optional[str] = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_admin(
    token: str = Depends(oauth2_scheme_admin), db: Session = Depends(get_db)
) -> models.Admin:
    """
    Lấy thông tin admin hiện tại từ token xác thực.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token không hợp lệ.")
    admin = db.query(models.Admin).filter(models.Admin.username == username).first()
    if admin is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin không tồn tại.")
    return admin


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    """
    Kiểm tra người dùng hiện tại có hợp lệ hay không.

    Args:
        current_user (models.User): Người dùng hiện tại.

    Returns:
        models.User: Thông tin người dùng nếu hợp lệ.
    """
    # Nếu có thêm thuộc tính is_active thì có thể kiểm tra tại đây
    return current_user