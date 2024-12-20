import React, { useEffect, useState } from "react";
import { getNews } from "../../services/newsService";
import styles from "./News.module.css";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.title}>Trang Tin Tức</h1>
      <div className={styles.newsGrid}>
        {news.map((item) => (
          <div key={item.id} className={styles.newsCard}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className={styles.newsImage}
              />
            )}
            <h3 className={styles.newsTitle}>{item.title}</h3>
            <p className={styles.newsExcerpt}>
              {item.content.slice(0, 500)}
            </p>
            <div className={styles.newsFooter}>
              <span className={styles.newsAuthor}>
                <strong>Tác giả:</strong> {item.author_id}
              </span>
              <span className={styles.newsDate}>
                <strong>Ngày:</strong>{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <button className={styles.readMoreButton}>Đọc thêm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;