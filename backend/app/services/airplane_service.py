from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from .. import models, schemas

def get_airplane_by_id(db: Session, airplane_id: int) -> models.Airplane:
    """
    Lấy thông tin máy bay theo ID.

    Tham số:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        airplane_id (int): ID của máy bay cần lấy thông tin.

    Trả về:
        models.Airplane: Thông tin của máy bay.

    Ngoại lệ:
        HTTPException: Nếu không tìm thấy máy bay với ID đã cung cấp.
    """
    airplane = db.query(models.Airplane).filter(models.Airplane.airplane_id == airplane_id).first()
    if not airplane:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy máy bay"
        )
    return airplane


def get_all_airplanes(db: Session) -> list[models.Airplane]:
    """
    Lấy danh sách tất cả máy bay trong cơ sở dữ liệu.

    Tham số:
        db (Session): Phiên kết nối cơ sở dữ liệu.

    Trả về:
        list[models.Airplane]: Danh sách các máy bay.
    """
    return db.query(models.Airplane).all()


def create_airplane(db: Session, airplane: schemas.AirplaneCreate) -> models.Airplane:
    """
    Tạo mới một máy bay.

    Tham số:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        airplane (schemas.AirplaneCreate): Dữ liệu máy bay cần tạo.

    Trả về:
        models.Airplane: Máy bay mới được tạo.
    """
    db_airplane = models.Airplane(**airplane.dict())
    db.add(db_airplane)
    db.commit()
    db.refresh(db_airplane)
    return db_airplane


def update_airplane(db: Session, airplane_id: int, airplane_update: schemas.AirplaneCreate) -> models.Airplane:
    """
    Cập nhật thông tin máy bay.

    Tham số:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        airplane_id (int): ID của máy bay cần cập nhật.
        airplane_update (schemas.AirplaneCreate): Dữ liệu cập nhật cho máy bay.

    Trả về:
        models.Airplane: Máy bay đã được cập nhật.

    Ngoại lệ:
        HTTPException: Nếu không tìm thấy máy bay với ID đã cung cấp.
    """
    airplane = get_airplane_by_id(db, airplane_id)
    update_data = airplane_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(airplane, key, value)
    db.commit()
    db.refresh(airplane)
    return airplane


def delete_airplane(db: Session, airplane_id: int) -> None:
    """
    Xóa máy bay khỏi cơ sở dữ liệu.

    Tham số:
        db (Session): Phiên kết nối cơ sở dữ liệu.
        airplane_id (int): ID của máy bay cần xóa.

    Ngoại lệ:
        HTTPException: Nếu không tìm thấy máy bay với ID đã cung cấp.
    """
    airplane = get_airplane_by_id(db, airplane_id)
    if airplane:
        db.delete(airplane)
        db.commit()
        return True
    return False
