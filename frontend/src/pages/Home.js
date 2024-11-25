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
      {/* Flight List Section */}
<section className={styles.exploreServices}>
  <h2 className={styles.sectionTitle}>LỊCH BAY HÔM NAY</h2>
  <div className={styles.flightListSection}>
    <FlightList />
  </div>
</section>

      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${locations[currentIndex].image})` }}
      >
        <div className={styles.heroOverlay}>
          <div className={styles.descriptionBox}>
            <h1 className={styles.locationTitle}>{locations[currentIndex].name}</h1>
            <p className={styles.locationDescription}>
              {locations[currentIndex].description}
            </p>
            {/* <button className={styles.bookBtn} to = "/booking/book-ticket">ĐẶT VÉ NGAY</button> */}
            <Link to="/booking/book-ticket">
              <button className={styles.bookBtn} to = "/booking/book-ticket">ĐẶT VÉ NGAY</button>
            </Link>
          </div>
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

<section className={styles.flightInfoSection}>
      <div className={styles.infoBanner}>
        <h2>Thông tin hữu ích cho chuyến bay của bạn</h2>
        <p>Tiêu chuẩn hành lý, điều kiện vé bay,... đều có ở đây!</p>
        <button className={styles.infoBtn}>Tra cứu &rarr;</button>
      </div>
</section>
<section className={styles.flightInfoSection}>
      <div className={styles.newsSection}>
        <div className={styles.newsItem}>
          <div className={styles.newsHeader}>
            <span className={styles.newsCategory}>
              <i className="fa fa-calendar"></i> Tin tức
            </span>
            <span className={styles.newsDate}>02/10/2024</span>
          </div>
          <a href="#" className={styles.newsTitle}>
            Thông báo về việc làm thủ tục trực tuyến từ sân bay Phù Cát (Quy Nhơn)
          </a>

          <div className={styles.newsActions}>
            <span className={styles.newsPagination}>3/3</span>
            <button className={styles.newsBtn}>Xem Thêm &rarr;</button>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}

export default Home;
