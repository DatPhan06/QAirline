import React, { useState, useRef} from "react";
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

const services = [
  {
    title: "Dịch vụ ẩm thực",
    description: "Thưởng thức dịch vụ ẩm thực tùy chọn trực tiếp trên chuyến bay.",
    image: "/images/hanhly.jpg",
  },
  {
    title: "Chỗ ngồi yêu thích",
    description: "Lựa chọn ghế ngồi yêu thích của bạn trên chuyến bay ngay hôm nay.",
    image: "/images/hanhly.jpg",
  },
  {
    title: "Mua thêm hành lý",
    description: "Bạn có thể nâng trọng lượng hành lý ký gửi theo các gói đa dạng và linh hoạt.",
    image: "/images/hanhly.jpg",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const servicesPerPage = 3; // Hiển thị 3 dịch vụ mỗi lần
  const serviceGridRef = useRef(null);

  // Hàm chuyển dịch các dịch vụ
  const handleNextService = () => {
    setCurrentServiceIndex((prevIndex) =>
      prevIndex + 1 >= services.length - servicesPerPage ? 0 : prevIndex + 1
    );
  };

  const handlePrevService = () => {
    setCurrentServiceIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${locations[currentIndex].image})` }}
      >
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
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className={styles.exploreServices}>
        <h2 className={styles.sectionTitle}>Dịch Vụ Bổ Trợ</h2>
        <div className={styles.serviceGridWrapper}>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.serviceImage}
                />
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner Section */}
      <section className={styles.infoBanner}>
        <div className={styles.infoContent}>
          <h2>Thông tin hữu ích cho chuyến bay của bạn</h2>
          <p>Tiêu chuẩn hành lý, điều kiện vé bay,… đều có ở đây!</p>
        </div>
        <button className={styles.infoBtn}>Tra cứu →</button>
      </section>

      {/* News Section */}
      <section className={styles.newsSection}>
        <div className={styles.newsContent}>
          <span className={styles.newsTitle}>Tin tức</span>
          <a href="#" className={styles.newsLink}>
            Bay Bangkok (Sân bay Don Mueang) - Tần suất hằng ngày
          </a>
          <button className={styles.newsMore}>Xem Thêm →</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          {/* Logo */}
          <div className={styles.footerLogo}>
            <img src="/images/ylogo.png" alt="Logo" className={styles.logoImage} />
          </div>

          {/* Thêm thông tin liên hệ hoặc thông tin bổ sung ở đây */}
          <div className={styles.footerInfo}>
            <p>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</p>
            <p>Email: contact@company.com</p>
            <p>Hotline: +84 123 456 789</p>
          </div>

          <div className={styles.footerLinks}>
            <Link to="/about" className={styles.footerLink}>Giới thiệu</Link>
            <Link to="/contact" className={styles.footerLink}>Liên hệ</Link>
            <Link to="/privacy" className={styles.footerLink}>Chính sách bảo mật</Link>
          </div>

          <p className={styles.footerCopyright}>
            &copy; 2024 Hãng hàng không QAirline.
          </p>
        </div>
      </footer>


      
    </div>
  );
}

export default Home;
