import React from "react";
import { Link } from "react-router-dom"; // Import Link từ React Router
import styles from "./Booking.module.css"; // Import CSS Module

const Booking = () => {
  return (
    <div className={styles.bookingPage}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.bookingSections}>
        <Link to="/booking/book-ticket" className={styles.section}>
          <h2>Mua Vé</h2>
          <p>Chọn chuyến bay và đặt vé dễ dàng.</p>
        </Link>
        <Link to="/booking/payment-guide" className={styles.section}>
          <h2>Hướng Dẫn Thanh Toán & Mua Vé</h2>
          <p>Các bước đơn giản để mua vé và thanh toán an toàn.</p>
        </Link>
        <Link to="/booking/cancel-ticket" className={styles.section}>
          <h2>Đổi & Hủy Vé</h2>
          <p>Xử lý các thay đổi hoặc hủy vé nhanh chóng.</p>
        </Link>
        <Link to="/booking/manage-ticket" className={styles.section}>
          <h2>Quản Lý Vé</h2>
          <p>Theo dõi và quản lý thông tin vé của bạn.</p>
        </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <div className={styles.chooseQAirline}>
        <h2>Hãy chọn QAirline - Vui từng chuyến bay cùng bạn</h2>
        <div className={styles.reasons}>
          <div className={styles.reason}>
            <div className={styles.reasonIcon}>💰</div>
            <div className={styles.reasonContent}>
              <h3>Giá cả cạnh tranh</h3>
              <p>Chúng tôi cam kết mang đến giá vé hợp lý với chất lượng dịch vụ hàng đầu.</p>
            </div>
          </div>
          <div className={styles.reason}>
            <div className={styles.reasonIcon}>✨</div>
            <div className={styles.reasonContent}>
              <h3>Chất lượng dịch vụ</h3>
              <p>Đội ngũ nhân viên tận tâm và chuyên nghiệp, sẵn sàng phục vụ bạn 24/7.</p>
            </div>
          </div>
          <div className={styles.reason}>
            <div className={styles.reasonIcon}>✈️</div>
            <div className={styles.reasonContent}>
              <h3>Đường bay đa dạng</h3>
              <p>Kết nối với hàng trăm điểm đến trong nước và quốc tế.</p>
            </div>
          </div>
          <div className={styles.reason}>
            <div className={styles.reasonIcon}>🎁</div>
            <div className={styles.reasonContent}>
              <h3>Ưu đãi hấp dẫn</h3>
              <p>Nhận ngay ưu đãi đặc biệt và tích lũy điểm thưởng sau mỗi chuyến bay.</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Booking;
