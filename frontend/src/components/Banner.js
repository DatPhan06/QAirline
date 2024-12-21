import React from "react";
import styles from "./Banner.module.css";

/**
 * Banner component renders a promotional banner with a logo, special offer text, and a call-to-action button.
 *
 * @component
 * @example
 * return (
 *   <Banner />
 * )
 */
const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <img src="/images/ylogo.png" alt="Logo" className={styles.logo} />
        <div className={styles.bannerText}>
          <span className={styles.highlight}>Ưu đãi đặc biệt:</span>
          <span>Giảm 20% cho chuyến bay quốc tế</span>
        </div>
        <button className={styles.bannerButton}>Đặt ngay</button>
      </div>
    </div>
  );
};

export default Banner;
