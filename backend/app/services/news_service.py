from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas


def create_news(db: Session, news: schemas.NewsCreate) -> models.News:
    """
    Tạo một tin tức mới.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        news (schemas.NewsCreate): Thông tin tin tức cần tạo.

    Returns:
        models.News: Đối tượng tin tức vừa được tạo.
    """
    db_news = models.News(**news.dict())
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news


def get_news(db: Session, news_id: int) -> models.News:
    """
    Lấy thông tin tin tức theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        news_id (int): ID của tin tức cần lấy.

    Returns:
        models.News: Đối tượng tin tức nếu tìm thấy, ngược lại là None.
    """
    news = db.query(models.News).filter(models.News.news_id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news


def get_all_news(db: Session) -> List[models.News]:
    """
    Lấy danh sách tất cả tin tức.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.

    Returns:
        list[models.News]: Danh sách các tin tức.
    """
    return db.query(models.News).all()


def update_news(db: Session, news_id: int, news_update: schemas.NewsCreate) -> models.News:
    """
    Cập nhật thông tin tin tức theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        news_id (int): ID của tin tức cần cập nhật.
        news_update (schemas.NewsUpdate): Dữ liệu cập nhật.

    Returns:
        models.News: Đối tượng tin tức sau khi cập nhật.
    """
    db_news = db.query(models.News).filter(models.News.news_id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")

    for key, value in news_update.dict(exclude_unset=True).items():
        setattr(db_news, key, value)

    db.commit()
    db.refresh(db_news)
    return db_news


def delete_news(db: Session, news_id: int) -> bool:
    """
    Xóa tin tức theo ID.

    Args:
        db (Session): Phiên làm việc với cơ sở dữ liệu.
        news_id (int): ID của tin tức cần xóa.

    Returns:
        bool: True nếu xóa thành công, False nếu không tìm thấy tin tức.
    """
    db_news = db.query(models.News).filter(models.News.news_id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")

    db.delete(db_news)
    db.commit()
    return True
