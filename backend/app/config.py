import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """
    Lớp Settings chứa cấu hình cho ứng dụng.
    """
    SECRET_KEY: str = "123456"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+pymysql://root:secret@localhost:3307/qairline")

settings: Settings = Settings()