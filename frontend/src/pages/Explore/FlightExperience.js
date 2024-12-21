// src/components/FlightExperience/FlightExperience.js

import React, { useEffect, useState } from "react";
import styles from "./FlightExperience.module.css";
import PropTypes from "prop-types";

// Component để hiển thị từng bài viết tin tức
const NewsItem = ({ title, image, description, date, delay }) => {
  return (
    <div className={styles.newsItem} style={{ animationDelay: `${delay}s` }}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.date}>
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

NewsItem.defaultProps = {
  delay: 0,
};

// Component để hiển thị danh sách tin tức
const FlightExperience = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [categories, setCategories] = useState([
    "Tất cả",
    "Hãng bay",
    "Dịch vụ",
    "An toàn",
    "Ưu đãi",
    "Khách hàng",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  useEffect(() => {
    // Giả lập dữ liệu tin tức, thay thế bằng API thực tế nếu có
    const fetchNews = async () => {
      const mockData = [
        {
          id: 1,
          title: "QAirline mở tuyến bay mới tới Tokyo",
          image: "/images/tokyo.jpeg",
          description:
            "QAirline chính thức khai trương tuyến bay mới nối Hà Nội - Tokyo, đáp ứng nhu cầu du lịch và kinh doanh.",
          date: "2024-11-25",
          category: "Hãng bay",
          featured: true,
        },
        {
          id: 2,
          title: "QAirline nâng cấp đội bay với máy bay Airbus A350",
          image: "/images/airways.png",
          description:
            "Hãng hàng không QAirline thông báo bổ sung thêm Airbus A350 vào đội bay, nâng cao chất lượng dịch vụ.",
          date: "2024-11-20",
          category: "Hãng bay",
          featured: false,
        },
        {
          id: 3,
          title:
            "QAirline triển khai dịch vụ Wi-Fi miễn phí trên các chuyến bay",
          image: "/images/seat2.jpg",
          description:
            "QAirline mang đến trải nghiệm mới cho hành khách với dịch vụ Wi-Fi miễn phí trên toàn bộ các chuyến bay.",
          date: "2024-11-15",
          category: "Dịch vụ",
          featured: false,
        },
        {
          id: 4,
          title: "QAirline hợp tác với đối tác du lịch để cung cấp gói ưu đãi",
          image: "/images/airwayfilm.jpg",
          description:
            "Hợp tác chiến lược với các đối tác du lịch, QAirline cung cấp các gói ưu đãi hấp dẫn cho hành khách.",
          date: "2024-11-10",
          category: "Ưu đãi",
          featured: false,
        },
        {
          id: 5,
          title: "QAirline đạt giải thưởng Hãng hàng không an toàn năm 2024",
          image: "/images/air1.jpg",
          description:
            "Với cam kết về an toàn bay, QAirline tự hào nhận giải thưởng Hãng hàng không an toàn năm 2024.",
          date: "2024-11-05",
          category: "An toàn",
          featured: true,
        },
        {
          id: 6,
          title: "QAirline giới thiệu chương trình khách hàng thân thiết mới",
          image: "/images/cloud.png",
          description:
            "Chương trình khách hàng thân thiết mới của QAirline mang đến nhiều ưu đãi và phần thưởng hấp dẫn cho hành khách thường xuyên.",
          date: "2024-11-01",
          category: "Khách hàng",
          featured: false,
        },
        // Thêm các bài viết khác ở đây
      ];

      // Giả lập độ trễ của API
      setTimeout(() => {
        setNews(mockData);
        setFeaturedNews(mockData.filter((item) => item.featured));
      }, 200);
    };

    fetchNews();
  }, []);

  // Lọc tin tức theo danh mục
  const filteredNews =
    selectedCategory === "Tất cả"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  return (
    <div className={styles.flightExperience}>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Tin Nổi Bật</h2>
        {featuredNews.length === 0 ? (
          <p className={styles.loading}>Đang tải tin nổi bật...</p>
        ) : (
          <div className={styles.featuredList}>
            {featuredNews.map((item, index) => (
              <NewsItem
                key={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                date={item.date}
                delay={index * 0.3}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2 className={styles.sectionTitle}>Tin Tức</h2>
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.activeCategory : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {news.length === 0 ? (
          <p className={styles.loading}>Đang tải tin tức...</p>
        ) : (
          <div className={styles.newsList}>
            {filteredNews.map((item, index) => (
              <NewsItem
                key={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                date={item.date}
                delay={index * 0.2}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.subscribeSection}>
        <h2 className={styles.sectionTitle}>Đăng Ký Nhận Tin</h2>
        <p className={styles.subscribeText}>
          Nhận thông tin cập nhật mới nhất từ QAirline trực tiếp vào hộp thư của
          bạn.
        </p>
        <form className={styles.subscribeForm}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className={styles.subscribeInput}
            required
          />
          <button type="submit" className={styles.subscribeButton}>
            Đăng Ký
          </button>
        </form>
      </section>
    </div>
  );
};

export default FlightExperience;
