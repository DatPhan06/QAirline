from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import models, schemas, services
from ..config import settings
from ..database import get_db

router = APIRouter(
    prefix="/admins",
    tags=["admins"],
)


@router.post("/register", response_model=schemas.Admin, status_code=status.HTTP_201_CREATED)
def register_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)) -> schemas.Admin:
    """
    Đăng ký admin mới.
    """
    return services.admin_service.create_admin(db, admin)


@router.post("/login")
def login_admin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> dict:
    """
    Đăng nhập admin, trả về mã thông báo truy cập.
    """
    admin = services.admin_service.authenticate_admin(
        db, form_data.username, form_data.password
    )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.user_service.create_access_token(
        data={"sub": admin.username},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.Admin)
def get_current_admin_info(
    current_admin: models.Admin = Depends(services.auth.get_current_admin)
) -> schemas.Admin:
    """
    Lấy thông tin admin hiện tại từ token xác thực.
    """
    return current_admin


@router.get("/{admin_id}", response_model=schemas.Admin)
def get_admin(admin_id: int, db: Session = Depends(get_db)) -> schemas.Admin:
    """
    Lấy thông tin admin theo ID.
    """
    admin = services.admin_service.get_admin_by_id(db, admin_id)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found"
        )
    return admin


@router.get("/", response_model=List[schemas.Admin])
def get_all_admins(db: Session = Depends(get_db)) -> List[schemas.Admin]:
    """
    Lấy danh sách tất cả các admin.
    """
    return services.admin_service.get_admins(db)


@router.put("/{admin_id}", response_model=schemas.Admin)
def update_admin(
    admin_id: int, admin_update: schemas.AdminUpdate, db: Session = Depends(get_db)
) -> schemas.Admin:
    """
    Cập nhật thông tin admin.
    """
    updated_admin = services.admin_service.update_admin(db, admin_id, admin_update)
    if not updated_admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    return updated_admin


@router.delete("/{admin_id}", response_model=dict)
def delete_admin(admin_id: int, db: Session = Depends(get_db)) -> dict:
    """
    Xóa admin theo ID.
    """
    success = services.admin_service.delete_admin(db, admin_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    return {"message": success}