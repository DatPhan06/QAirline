import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """
    Lớp Settings chứa cấu hình cho ứng dụng.
    """
    SECRET_KEY: str = "123456"
    ALGORITHM: str = "HS256"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+pymysql://user:password@localhost/dbname")

settings: Settings = Settings()