// Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

/**
 * Footer component renders the footer section of the website.
 * It includes the company logo, contact information, navigation links,
 * social media links, and a copyright notice.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Xử lý đăng ký tại đây (ví dụ: gửi email đến API)
    alert(`Đăng ký thành công với email: ${email}`);
    setEmail("");
  };

  return (
    /* Footer Section */
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.footerLogo}>
          <img
            src="/images/logo&text.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>

        {/* Thông tin liên hệ */}
        <div className={styles.footerInfo}>
          <h3 className={styles.footerTitle}>Liên hệ</h3>
          <p>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</p>
          <p>Email: contact@company.com</p>
          <p>Hotline: +84 123 456 789</p>
          <p>Giờ làm việc: Thứ 2 - Thứ 6: 8:00 - 18:00</p>
        </div>

        {/* Liên kết điều hướng */}
        <div className={styles.footerLinks}>
          <h3 className={styles.footerTitle}>Liên kết</h3>
          <Link to="/about" className={styles.footerLink}>
            Giới thiệu
          </Link>
          <br></br>
          <Link to="/services" className={styles.footerLink}>
            Dịch vụ
          </Link>
          <br></br>
          <Link to="/contact" className={styles.footerLink}>
            Liên hệ
          </Link>
          <br></br>
          <Link to="/privacy" className={styles.footerLink}>
            Chính sách bảo mật
          </Link>
          <br></br>
          <Link to="/terms" className={styles.footerLink}>
            Điều khoản sử dụng
          </Link>
        </div>

        {/* Mạng xã hội */}
        <div className={styles.footerSocial}>
          <h3 className={styles.footerTitle}>Theo dõi chúng tôi</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          &copy; 2024 Hãng hàng không QAirline. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
