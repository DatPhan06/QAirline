from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import func

from .. import models, schemas
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Xác minh mật khẩu người dùng với mật khẩu đã được hash.

    Args:
        plain_password (str): Mật khẩu dưới dạng plain text.
        hashed_password (str): Mật khẩu đã được hash.

    Returns:
        bool: True nếu mật khẩu trùng khớp, False nếu không.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash mật khẩu sử dụng bcrypt.

    Args:
        password (str): Mật khẩu dưới dạng plain text.

    Returns:
        str: Mật khẩu đã được hash.
    """
    return pwd_context.hash(password)


def get_admin_by_username(db: Session, username: str) -> Optional[models.Admin]:
    """
    Lấy thông tin quản trị viên bằng tên đăng nhập.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        username (str): Tên đăng nhập.

    Returns:
        Optional[models.Admin]: Đối tượng quản trị viên hoặc None nếu không tìm thấy.
    """
    return db.query(models.Admin).filter(models.Admin.username == username).first()


def get_admin_by_id(db: Session, admin_id: int) -> Optional[models.Admin]:
    """
    Lấy thông tin quản trị viên bằng ID.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        admin_id (int): ID của quản trị viên.

    Returns:
        Optional[models.Admin]: Đối tượng quản trị viên hoặc None nếu không tìm thấy.
    """
    return db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()


def get_admins(db: Session) -> List[models.Admin]:
    """
    Lấy danh sách tất cả quản trị viên.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.

    Returns:
        List[models.Admin]: Danh sách quản trị viên.
    """
    return db.query(models.Admin).all()


def create_admin(db: Session, admin: schemas.AdminCreate) -> models.Admin:
    """
    Tạo quản trị viên mới.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        admin (schemas.AdminCreate): Thông tin quản trị viên cần tạo.

    Raises:
        HTTPException: Nếu tên đăng nhập đã được sử dụng.

    Returns:
        models.Admin: Đối tượng quản trị viên mới được tạo.
    """
    if get_admin_by_username(db, admin.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tên đăng nhập đã được sử dụng.",
        )
    hashed_password = get_password_hash(admin.password)
    db_admin = models.Admin(
        username=admin.username,
        hashed_password=hashed_password,
        role=admin.role,
        permissions=admin.permissions,
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


def authenticate_admin(db: Session, username: str, password: str) -> models.Admin:
    """
    Xác thực thông tin quản trị viên.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        username (str): Tên đăng nhập của quản trị viên.
        password (str): Mật khẩu của quản trị viên.

    Raises:
        HTTPException: Nếu tên đăng nhập hoặc mật khẩu không chính xác.

    Returns:
        models.Admin: Đối tượng quản trị viên được xác thực.
    """
    admin = get_admin_by_username(db, username)
    if not admin or not verify_password(password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không chính xác.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return admin


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Tạo JWT access token.

    Args:
        data (dict): Dữ liệu payload cho token.
        expires_delta (Optional[timedelta]): Thời gian hiệu lực của token, mặc định là 15 phút.

    Returns:
        str: Access token đã được mã hóa.
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


def update_admin(db: Session, admin_id: int, admin_update: schemas.AdminUpdate) -> models.Admin:
    """
    Cập nhật thông tin quản trị viên.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        admin_id (int): ID của quản trị viên cần cập nhật.
        admin_update (schemas.AdminUpdate): Thông tin cập nhật.

    Raises:
        HTTPException: Nếu quản trị viên không tồn tại.

    Returns:
        models.Admin: Đối tượng quản trị viên sau khi cập nhật.
    """
    db_admin = get_admin_by_id(db, admin_id)
    if not db_admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin không tồn tại.",
        )
    update_data = admin_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data["password"])
        del update_data["password"]
    for key, value in update_data.items():
        setattr(db_admin, key, value)
    db.commit()
    db.refresh(db_admin)
    return db_admin


def delete_admin(db: Session, admin_id: int) -> dict:
    """
    Xóa quản trị viên.

    Args:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        admin_id (int): ID của quản trị viên cần xóa.

    Raises:
        HTTPException: Nếu quản trị viên không tồn tại.

    Returns:
        dict: Thông báo xác nhận xóa thành công.
    """
    db_admin = get_admin_by_id(db, admin_id)
    if not db_admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin không tồn tại.",
        )
        return False
    db.delete(db_admin)
    db.commit()
    return {"message": "Admin đã được xóa thành công."}

def get_general_stats(db: Session) -> dict:
    """
    Lấy thống kê tổng quát.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thống kê tổng quát.
    """
    total_bookings = db.query(models.BookedTicket).count()
    total_revenue = db.query(models.BookedTicket).with_entities(func.sum(models.BookedTicket.price)).scalar()
    total_airplanes = db.query(models.Airplane).count()
    total_flights = db.query(models.Flight).count()

    return {
        "totalBookings": total_bookings,
        "totalRevenue": total_revenue,
        "totalAirplanes": total_airplanes,
        "totalFlights": total_flights,
    }