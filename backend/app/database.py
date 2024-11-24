from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings

# URL kết nối cơ sở dữ liệu
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Tạo engine và session
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Hàm tạo phiên làm việc với cơ sở dữ liệu
def get_db():
    """
    Tạo và trả về một phiên làm việc với cơ sở dữ liệu.

    Yields:
        Session: Phiên làm việc với cơ sở dữ liệu.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
