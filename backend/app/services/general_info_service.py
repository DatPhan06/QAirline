from sqlalchemy.orm import Session
from ..models.general_info import GeneralInfo

def get_general_info(db: Session):
    return db.query(GeneralInfo).all()