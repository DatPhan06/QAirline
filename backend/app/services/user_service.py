from sqlalchemy.orm import Session
from .. import models, schemas
from passlib.context import CryptContext

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

def authenticate_user(db: Session, email: str, password: str) -> models.User:
    """
    Xác thực người dùng.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        email (str): Địa chỉ email của người dùng.
        password (str): Mật khẩu của người dùng.

    Returns:
        models.User: Thông tin người dùng nếu xác thực thành công, ngược lại False.
    """
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user