from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import models, schemas, services
from ..config import settings
from ..database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)


@router.post("/register", response_model=schemas.Admin, status_code=status.HTTP_201_CREATED, dependencies=[Depends(services.auth.get_current_admin)])
def register_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)) -> schemas.Admin:
    """
    Đăng ký admin mới.

    Args:
        admin (schemas.AdminCreate): Thông tin admin mới.
        db (Session): Kết nối cơ sở dữ liệu.

    Returns:
        schemas.Admin: Đối tượng admin đã được tạo.
    """
    return services.admin_service.create_admin(db, admin)


@router.post("/login")
def login_admin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> dict:
    """
    Đăng nhập admin, trả về mã thông báo truy cập (JWT).

    Args:
        form_data (OAuth2PasswordRequestForm): Dữ liệu tên đăng nhập và mật khẩu.
        db (Session): Kết nối cơ sở dữ liệu.

    Returns:
        dict: Mã thông báo truy cập (JWT) và loại mã thông báo (bearer).
    """
    admin = services.admin_service.authenticate_admin(
        db, form_data.username, form_data.password
    )

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không đúng",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.user_service.create_access_token(
        data={"sub": admin.username},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.Admin, dependencies=[Depends(services.auth.get_current_admin)])
def get_current_admin_info(
    current_admin: models.Admin = Depends(services.auth.get_current_admin)
) -> schemas.Admin:
    """
    Lấy thông tin admin hiện tại từ token xác thực.

    Args:
        current_admin (models.Admin): Admin hiện tại từ middleware xác thực.

    Returns:
        schemas.Admin: Thông tin của admin hiện tại.
    """
    return current_admin


@router.get("/{admin_id}", response_model=schemas.Admin, dependencies=[Depends(services.auth.get_current_admin)])
def get_admin(admin_id: int, db: Session = Depends(get_db)) -> schemas.Admin:
    """
    Lấy thông tin admin theo ID.

    Args:
        admin_id (int): ID của admin cần lấy thông tin.
        db (Session): Kết nối cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy admin với ID cung cấp.

    Returns:
        schemas.Admin: Đối tượng admin với thông tin chi tiết.
    """
    admin = services.admin_service.get_admin_by_id(db, admin_id)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found"
        )
    return admin


@router.get("/", response_model=List[schemas.Admin], dependencies=[Depends(services.auth.get_current_admin)])
def get_all_admins(db: Session = Depends(get_db)) -> List[schemas.Admin]:
    """
    Lấy danh sách tất cả các admin.

    Args:
        db (Session): Kết nối cơ sở dữ liệu.

    Returns:
        List[schemas.Admin]: Danh sách tất cả các admin.
    """
    return services.admin_service.get_admins(db)


@router.put("/{admin_id}", response_model=schemas.Admin, dependencies=[Depends(services.auth.get_current_admin)])
def update_admin(
    admin_id: int, admin_update: schemas.AdminUpdate, db: Session = Depends(get_db)
) -> schemas.Admin:
    """
    Cập nhật thông tin admin.

    Args:
        admin_id (int): ID của admin cần cập nhật.
        admin_update (schemas.AdminUpdate): Các thay đổi cần cập nhật.
        db (Session): Kết nối cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy admin với ID cung cấp.

    Returns:
        schemas.Admin: Đối tượng admin đã được cập nhật.
    """
    updated_admin = services.admin_service.update_admin(db, admin_id, admin_update)
    if not updated_admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    return updated_admin


@router.delete("/{admin_id}", response_model=dict, dependencies=[Depends(services.auth.get_current_admin)])
def delete_admin(admin_id: int, db: Session = Depends(get_db)) -> dict:
    """
    Xóa admin theo ID.

    Args:
        admin_id (int): ID của admin cần xóa.
        db (Session): Kết nối cơ sở dữ liệu.

    Raises:
        HTTPException: Nếu không tìm thấy admin với ID cung cấp.

    Returns:
        dict: Thông báo xóa admin thành công.
    """
    success = services.admin_service.delete_admin(db, admin_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    return success
