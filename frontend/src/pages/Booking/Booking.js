import React from "react";
import { Link } from "react-router-dom"; // Import Link từ React Router
import styles from "./Booking.module.css"; // Import CSS Module

const Booking = () => {
  return (
    <div className={styles["homepage-01"]}>
      
        <div className={styles.section1}>
            <img className={styles["arrow-1"]} src="/images/arrow1.svg" />
            <div className={styles["tr-i-nghi-m-t-v-c-ng-q-airline"]}>
              Trải nghiệm đặt vé cùng QAirline
            </div>
            <div
              className={styles["h-y-ng-m-nh-n-th-gi-i-i-u-tuy-t-v-i-h-n-b-t-c-gi-c-m-n-o-ray-bradbury"]}
            >
              “Hãy ngắm nhìn thế giới. Điều đó tuyệt vời hơn bất cứ giấc mơ nào” – Ray
              Bradbury
            </div>
        </div>

    <div className={styles.section2}>
        <img className={styles["arrow-3"]} src="/images/arrow1.svg" />
        <div className={styles["why-choose-us"]}>Why choose us?</div>
        <img className={styles["rectangle-8"]} src="/images/airwayfilm.jpg" />
        <div className={styles["ellipse-1"]}></div>
        <div className={styles["ellipse-5"]}></div>
        <div className={styles["ellipse-2"]}></div>
        <div className={styles["ellipse-6"]}></div>
        <div className={styles["gi-c-c-nh-tranh"]}>Giá cả cạnh tranh</div>
        <div className={styles["ng-bay-a-d-ng"]}>Đường bay đa dạng</div>
        <div className={styles["ch-t-l-ng-d-ch-v-t-t"]}>Chất lượng dịch vụ tốt</div>
        <div className={styles["u-i-h-p-d-n"]}>Ưu đãi hấp dẫn</div>
    </div>

    <div className={styles.section3}> 
      <div className={styles["c-c-d-ch-v-d-nh-cho-qu-kh-ch"]}>
        Các dịch vụ dành cho quý khách
      </div>
      <img 
        className={styles["arrow-4"]} 
        src="/images/arrow4.png" 
        alt="Arrow" 
        loading="lazy" 
      />

      <div className={styles.imageLinkGrid}>
        <div className={styles.imageLinkWrapper}>
          <img 
            className={styles.rectangle13} 
            src="/images/seat2.jpg" 
            alt="Seat" 
            loading="lazy" 
          />
          <Link to="/booking/book-ticket" className={styles.link}>
            <div className={styles.ellipse}>ĐẶT VÉ</div>
          </Link>
        </div>
        <div className={styles.imageLinkWrapper}>
          <img 
            className={styles.rectangle9} 
            src="/images/table.jpg" 
            alt="Table" 
            loading="lazy" 
          />
          <Link to="/booking/manage-ticket" className={styles.link}>
            <div className={styles.ellipse}>Quản lý vé</div>
          </Link>
        </div>
        <div className={styles.imageLinkWrapper}>
          <img 
            className={styles.rectangle11} 
            src="/images/guide.jpg" 
            alt="Guide" 
            loading="lazy" 
          />
          <Link to="/booking/payment-guide" className={styles.link}>
            <div className={styles.ellipse}>Hướng dẫn mua vé &amp; thanh toán</div>
          </Link>
        </div>
        <div className={styles.imageLinkWrapper}>
          <img 
            className={styles.rectangle10} 
            src="/images/ticket.jpg" 
            alt="Ticket" 
            loading="lazy" 
          />
          <Link to="/booking/cancel-ticket" className={styles.link}>
            <div className={styles.ellipse}>Đổi &amp; Hủy vé</div>
          </Link>
        </div>
      </div>
    </div>
</div>

    
  );
};

export default Booking;
