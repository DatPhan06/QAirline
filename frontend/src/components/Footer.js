import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    /* Footer Section */
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.footerLogo}>
          <img src="/images/logo&text.png" alt="Logo" className={styles.logoImage} />
        </div>

        {/* Thông tin liên hệ */}
        <div className={styles.footerInfo}>
          <p>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</p>
          <p>Email: contact@company.com</p>
          <p>Hotline: +84 123 456 789</p>
        </div>

        {/* Liên kết điều hướng */}
        <div className={styles.footerLinks}>
          <Link to="/about" className={styles.footerLink}>Giới thiệu</Link>
          <Link to="/contact" className={styles.footerLink}>Liên hệ</Link>
          <Link to="/privacy" className={styles.footerLink}>Chính sách bảo mật</Link>
        </div>

        {/* Bản quyền */}
        <p className={styles.footerCopyright}>
          &copy; 2024 Hãng hàng không QAirline.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
