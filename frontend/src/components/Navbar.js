import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

/**
 * Thành phần Navbar hiển thị thanh điều hướng của trang web.
 * Bao gồm các mục chính như Đặt Vé, Thông Tin Hành Trình, Khám Phá, QAirline và Tài Khoản.
 *
 * @component
 * @returns {JSX.Element} Thành phần Navbar.
 */
const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">
              <img 
                src="/images/ylogo.png" 
                alt="Logo" 
                className={styles.logo}
              />
            </Link>
          </li>

        {/* Mục Đặt Vé */}
        <li className={styles.navItem}>
          <Link to="/booking" className={styles.navLink}>
            ĐẶT VÉ
          </Link>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuItem}>
              <Link to="/booking/book-ticket" className={styles.subMenuLink}>
                Mua Vé
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/booking/manage-ticket" className={styles.subMenuLink}>
                Quản Lý Vé
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/booking/payment-guide" className={styles.subMenuLink}>
                Hướng Dẫn 
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/booking/cancell-ticket"
                className={styles.subMenuLink}
              >
                Đổi vé & Hủy vé
              </Link>
            </li>
          </ul>
        </li>

        {/* Mục Thông Tin */}
        <li className={styles.navItem}>
          <Link to="/info" className={styles.navLink}>
            THÔNG TIN HÀNH TRÌNH
          </Link>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuItem}>
              <Link to="/info/ticket-schedule" className={styles.subMenuLink}>
                Vé & Lịch Bay
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/info/special-services" className={styles.subMenuLink}>
                Dịch Vụ Đặc Biệt
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/info/baggage" className={styles.subMenuLink}>
                Hành Lý
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/info/check-in" className={styles.subMenuLink}>
                Thủ Tục
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/info/document-requirements"
                className={styles.subMenuLink}
              >
                Yêu Cầu Giấy Tờ
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/info/airport" className={styles.subMenuLink}>
                Sân Bay
              </Link>
            </li>
          </ul>
        </li>

        {/* Mục Khám Phá */}
        <li className={styles.navItem}>
          <Link to="/explore" className={styles.navLink}>
            KHÁM PHÁ
          </Link>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuItem}>
              <Link to="/explore/destinations" className={styles.subMenuLink}>
                Điểm Đến
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/explore/offers" className={styles.subMenuLink}>
                Ưu Đãi
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/explore/flight-experience"
                className={styles.subMenuLink}
              >
                Trải Nghiệm Bay
              </Link>
            </li>
          </ul>
        </li>

        {/* Mục Hãng Hàng Không */}
        <li className={styles.navItem}>
          <Link to="/qairline" className={styles.navLink}>
            QAirline
          </Link>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuItem}>
              <Link to="/qairline/about" className={styles.subMenuLink}>
                Giới Thiệu
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/qairline/news" className={styles.subMenuLink}>
                Tin Tức
              </Link>
            </li>
          </ul>
        </li>

        {/* Mục Tài Khoản */}
        <li className={`${styles.navItem} ${styles.account}`}>
          <Link to="/account" className={styles.navLink}>
            Tài Khoản
            <img
              src="https://via.placeholder.com/30"
              alt="Avatar"
              className={styles.avatar}
            />
          </Link>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuItem}>
              <Link to="/account/profile" className={styles.subMenuLink}>
                Hồ Sơ
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/account/settings" className={styles.subMenuLink}>
                Cài Đặt
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/account/signin" className={styles.subMenuLink}>
                Đăng Nhập
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/account/signup" className={styles.subMenuLink}>
                Đăng Ký
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/account/logout" className={styles.subMenuLink}>
                Đăng Xuất
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
