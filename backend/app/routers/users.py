from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import models, schemas, services
from ..config import settings
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)) -> models.User:
    """
    Đăng ký một người dùng mới.

    Args:
        user (schemas.UserCreate): Thông tin người dùng để tạo mới.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        models.User: Thông tin người dùng đã được tạo.
    """
    return services.user_service.create_user(db, user)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> dict:
    """
    Đăng nhập người dùng và trả về mã thông báo truy cập.

    Args:
        form_data (OAuth2PasswordRequestForm): Dữ liệu đăng nhập từ người dùng.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Mã thông báo truy cập và loại token.
    """
    user = services.user_service.authenticate_user(
        db, form_data.username, form_data.password
    )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.user_service.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.User)
def read_users_me(
    current_user: models.User = Depends(services.auth.get_current_active_user),
) -> schemas.User:
    """
    Lấy thông tin người dùng hiện tại đã đăng nhập.

    Args:
        current_user (models.User): Người dùng hiện tại (được xác thực).

    Returns:
        models.User: Thông tin người dùng hiện tại.
    """
    return schemas.User.from_orm(current_user)


@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)) -> models.User:
    """
    Lấy thông tin người dùng theo ID.

    Args:
        user_id (int): ID của người dùng cần lấy thông tin.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy người dùng với ID đã cho.

    Returns:
        models.User: Thông tin người dùng.
    """
    user = services.user_service.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Người dùng không tồn tại"
        )
    return user


@router.get("/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)) -> List[models.User]:
    """
    Lấy danh sách tất cả người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        List[models.User]: Danh sách người dùng.
    """
    return services.user_service.get_users(db)


@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)
) -> models.User:
    """
    Cập nhật thông tin người dùng.

    Args:
        user_id (int): ID của người dùng cần cập nhật.
        user (schemas.UserUpdate): Thông tin cần cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        models.User: Thông tin người dùng sau khi cập nhật.
    """
    return services.user_service.update_user(db, user_id, user)


@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db)) -> dict:
    """
    Xóa người dùng khỏi hệ thống.

    Args:
        user_id (int): ID của người dùng cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thông báo xác nhận xóa thành công.
    """
    return services.user_service.delete_user(db, user_id)

@router.put("/{user_id}/change-password", response_model=schemas.User)
def change_user_password(
    user_id: int,
    password_change_request: schemas.PasswordChangeRequest,
    db: Session = Depends(get_db),
) -> models.User:
    """
    Đổi mật khẩu người dùng.

    Args:
        user_id (int): ID của người dùng cần đổi mật khẩu.
        password_change_request (schemas.PasswordChangeRequest): Thông tin đổi mật khẩu.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        models.User: Thông tin người dùng sau khi đổi mật khẩu.
    """
    return services.user_service.change_password(db, user_id, password_change_request)