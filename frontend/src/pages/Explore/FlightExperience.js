// src/components/FlightExperience/FlightExperience.js

import React, { useEffect, useState } from 'react';
import styles from './FlightExperience.module.css';
import PropTypes from 'prop-types';

// Component con để hiển thị từng bài viết tin tức
const NewsItem = ({ title, image, description, date, delay }) => {
  return (
    <div
      className={styles.newsItem}
      style={{ animationDelay: `${delay}s` }}
    >
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.date}>{date}</span>
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

// Component chính để hiển thị danh sách tin tức
const FlightExperience = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu tin tức, thay thế bằng API thực tế nếu có
    const fetchNews = async () => {
      const mockData = [
        {
          id: 1,
          title: 'QAirline mở tuyến bay mới tới Tokyo',
          image: 'https://via.placeholder.com/600x400',
          description:
            'QAirline chính thức khai trương tuyến bay mới nối Hà Nội - Tokyo, đáp ứng nhu cầu du lịch và kinh doanh.',
          date: '2024-11-25',
        },
        {
          id: 2,
          title: 'QAirline nâng cấp đội bay với máy bay Airbus A350',
          image: 'https://via.placeholder.com/600x400',
          description:
            'Hãng hàng không QAirline thông báo bổ sung thêm Airbus A350 vào đội bay, nâng cao chất lượng dịch vụ.',
          date: '2024-11-20',
        },
        {
          id: 3,
          title: 'QAirline triển khai dịch vụ Wi-Fi miễn phí trên các chuyến bay',
          image: 'https://via.placeholder.com/600x400',
          description:
            'QAirline mang đến trải nghiệm mới cho hành khách với dịch vụ Wi-Fi miễn phí trên toàn bộ các chuyến bay.',
          date: '2024-11-15',
        },
        // Thêm các bài viết khác ở đây
      ];

      // Giả lập độ trễ của API
      setTimeout(() => {
        setNews(mockData);
      }, 1000);
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.flightExperience}>
      <h1 className={styles.header}>Trải Nghiệm Hàng Không</h1>
      {news.length === 0 ? (
        <p className={styles.loading}></p>
      ) : (
        news.map((item, index) => (
          <NewsItem
            key={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
            date={item.date}
            delay={index * 0.2} // Thêm delay cho mỗi NewsItem
          />
        ))
      )}
    </div>
  );
};

export default FlightExperience;
