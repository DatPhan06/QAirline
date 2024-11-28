from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, database, services

router = APIRouter(
    prefix="/news",
    tags=["news"],
)

@router.post("/", response_model=schemas.News)
def create_news(news: schemas.NewsCreate, db: Session = Depends(database.get_db)) -> schemas.News:
    """
    Tạo một tin tức mới.

    Args:
        news (schemas.NewsCreate): Thông tin tin tức cần tạo.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.News: Thông tin tin tức vừa được tạo.
    """
    return services.news_service.create_news(db, news)


@router.get("/{news_id}", response_model=schemas.News)
def get_news(news_id: int, db: Session = Depends(database.get_db)) -> schemas.News:
    """
    Lấy thông tin tin tức theo ID.

    Args:
        news_id (int): ID của tin tức cần lấy.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.News: Thông tin tin tức.
    """
    return services.news_service.get_news(db, news_id)


@router.get("/", response_model=List[schemas.News])
def get_all_news(db: Session = Depends(database.get_db)) -> List[schemas.News]:
    """
    Lấy danh sách tất cả tin tức.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[schemas.News]: Danh sách các tin tức.
    """
    return services.news_service.get_all_news(db)


@router.put("/{news_id}", response_model=schemas.News)
def update_news(news_id: int, news: schemas.NewsCreate, db: Session = Depends(database.get_db)) -> schemas.News:
    """
    Cập nhật thông tin tin tức theo ID.

    Args:
        news_id (int): ID của tin tức cần cập nhật.
        news_update (schemas.NewsUpdate): Dữ liệu cập nhật.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        schemas.News: Thông tin tin tức sau khi cập nhật.
    """
    updated_news = services.news_service.update_news(db, news_id, news)
    if not updated_news:
        raise HTTPException(status_code=404, detail="General news not found")
    return updated_news


@router.delete("/{news_id}", response_model=dict)
def delete_news(news_id: int, db: Session = Depends(database.get_db)) -> dict:
    """
    Xóa tin tức theo ID.

    Args:
        news_id (int): ID của tin tức cần xóa.
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        dict: Kết quả xóa.
    """
    success = services.news_service.delete_news(db, news_id)
    if not success:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": success}
