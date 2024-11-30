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
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_admin_by_username(db: Session, username: str) -> Optional[models.Admin]:
    return db.query(models.Admin).filter(models.Admin.username == username).first()

def get_admin_by_id(db: Session, admin_id: int) -> Optional[models.Admin]:
    return db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()

def get_admins(db: Session) -> List[models.Admin]:
    return db.query(models.Admin).all()

def create_admin(db: Session, admin: schemas.AdminCreate) -> models.Admin:
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
    admin = get_admin_by_username(db, username)
    if not admin or not verify_password(password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không chính xác.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return admin

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
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
    db_admin = get_admin_by_id(db, admin_id)
    if not db_admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin không tồn tại.",
        )
    db.delete(db_admin)
    db.commit()
    return {"detail": "Admin đã được xóa thành công."}
