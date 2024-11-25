import React, { useState } from "react";
import styles from "./Home.module.css"; // Import CSS Module
import { Link } from "react-router-dom";
import FlightList from "../components/FlightList";

const locations = [
  {
    name: "Hà Nội",
    description: "Thủ đô nghìn năm văn hiến với Hồ Gươm và ẩm thực tuyệt vời.",
    image: "/images/hanoi.jpeg",
  },
  {
    name: "Bangkok",
    description: "Thành phố sôi động với những ngôi đền vàng và ẩm thực đường phố.",
    image: "/images/bangkok.jpeg",
  },
  {
    name: "Tokyo",
    description: "Thủ đô hiện đại với văn hóa anime, sushi, và hoa anh đào.",
    image: "/images/tokyo.jpeg",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${locations[currentIndex].image})` }}
      >
        <h1 className={styles.header}> QAIRLINE - VUI TỪNG CHUYẾN BAY </h1>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.descriptionBox}>
              <h2 className={styles.locationTitle}>{locations[currentIndex].name}</h2>
              <p className={styles.locationDescription}>
                {locations[currentIndex].description}
              </p>
              <Link to="/booking/book-ticket">
                <button className={styles.bookBtn}>ĐẶT VÉ NGAY</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.flightListSection}>
              <FlightList />
        </div>

        {/* Navigation Dots */}
        <div className={styles.dotsContainer}>
          {locations.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className={styles.exploreServices}>
        <h2 className={styles.sectionTitle}>Khám phá QAirline</h2>
        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            <img src="/images/service1.jpeg" alt="Dịch vụ" className={styles.serviceImage} />
            <h3>Trải nghiệm bay cao cấp</h3>
            <p>Thưởng thức dịch vụ 5 sao trên mọi chuyến bay.</p>
          </div>
          <div className={styles.serviceCard}>
            <img src="/images/service2.jpeg" alt="Ưu đãi" className={styles.serviceImage} />
            <h3>Ưu đãi đặc biệt</h3>
            <p>Nhận ngay ưu đãi khi đặt vé trực tuyến.</p>
          </div>
          <div className={styles.serviceCard}>
            <img src="/images/service3.jpeg" alt="Hành lý" className={styles.serviceImage} />
            <h3>Hành lý tiện lợi</h3>
            <p>Đảm bảo tiêu chuẩn hành lý dễ dàng và nhanh chóng.</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoBanner}>
        <h2>Thông tin hữu ích</h2>
        <p>Tất cả bạn cần biết cho hành trình của mình.</p>
        <button className={styles.infoBtn}>Tìm hiểu thêm</button>
      </section>

      {/* News Section */}
      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>Tin tức mới nhất</h2>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <h3>Thủ tục trực tuyến tại sân bay Phù Cát</h3>
            <p>Ngày cập nhật: 02/10/2024</p>
            <button className={styles.newsBtn}>Xem thêm</button>
          </div>
          <div className={styles.newsCard}>
            <h3>Khuyến mãi mùa hè</h3>
            <p>Ngày cập nhật: 15/06/2024</p>
            <button className={styles.newsBtn}>Xem thêm</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;