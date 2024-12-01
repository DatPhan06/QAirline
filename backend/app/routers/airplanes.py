from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, services, database

router = APIRouter(
    prefix="/airplanes",
    tags=["airplanes"],
)


@router.post("/", response_model=schemas.Airplane, status_code=status.HTTP_201_CREATED)
def create_airplane(
    airplane: schemas.AirplaneCreate,
    db: Session = Depends(database.get_db)
):
    """
    Tạo máy bay mới.

    Args:
        airplane (schemas.AirplaneCreate): Dữ liệu máy bay cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Airplane: Thông tin máy bay mới được tạo.
    """
    return services.airplane_service.create_airplane(db, airplane)


@router.get("/{airplane_id}", response_model=schemas.Airplane)
def get_airplane_by_id(
    airplane_id: int,
    db: Session = Depends(database.get_db)
):
    """
    Lấy thông tin máy bay theo ID.

    Args:
        airplane_id (int): ID của máy bay cần tìm.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Airplane: Thông tin máy bay tương ứng.

    Raises:
        HTTPException: Nếu không tìm thấy máy bay với ID được cung cấp.
    """
    airplane = services.airplane_service.get_airplane_by_id(db, airplane_id)
    if not airplane:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Airplane not found"
        )
    return airplane


@router.get("/", response_model=list[schemas.Airplane])
def get_all_airplanes(db: Session = Depends(database.get_db)):
    """
    Lấy danh sách tất cả máy bay.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[schemas.Airplane]: Danh sách tất cả các máy bay trong hệ thống.
    """
    return services.airplane_service.get_all_airplanes(db)


@router.put("/{airplane_id}", response_model=schemas.Airplane)
def update_airplane(
    airplane_id: int,
    airplane_update: schemas.AirplaneCreate,
    db: Session = Depends(database.get_db)
):
    """
    Cập nhật thông tin máy bay.

    Args:
        airplane_id (int): ID của máy bay cần cập nhật.
        airplane_update (schemas.AirplaneCreate): Dữ liệu cập nhật cho máy bay.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.Airplane: Thông tin máy bay sau khi cập nhật.

    Raises:
        HTTPException: Nếu không tìm thấy máy bay với ID được cung cấp.
    """
    updated_airplane = services.airplane_service.update_airplane(
        db, airplane_id, airplane_update
    )
    if not updated_airplane:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Airplane not found"
        )
    return updated_airplane


@router.delete("/{airplane_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_airplane(
    airplane_id: int,
    db: Session = Depends(database.get_db)
):
    """
    Xóa máy bay khỏi cơ sở dữ liệu.

    Args:
        airplane_id (int): ID của máy bay cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Thông báo xác nhận máy bay đã được xóa.

    Raises:
        HTTPException: Nếu không tìm thấy máy bay với ID được cung cấp.
    """
    success = services.airplane_service.delete_airplane(db, airplane_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Airplane not found"
        )
    return {"message": "Airplane deleted successfully"}
