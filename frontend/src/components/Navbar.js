import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getUserNotifications } from "../services/notificationService";
import { getCurrentUser } from "../services/userService";
import styles from "./Navbar.module.css";

/**
 * Thành phần Navbar hiển thị thanh điều hướng của trang web.
 * Bao gồm các mục chính như Đặt Vé, Thông Tin Hành Trình, Khám Phá, QAirline và Tài Khoản.
 *
 * @component
 * @returns {JSX.Element} Thành phần Navbar.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      if (isLoggedIn) {
        try {
          const userData = await getCurrentUser();
          setCurrentUser(userData);

          if (userData) {
            const userNotifications = await getUserNotifications(
              userData.user_id
            );
            setNotifications(userNotifications);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserAndNotifications();
  }, [isLoggedIn]);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        {isMenuOpen ? "×" : "☰"}
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">
              <img
                src="/images/vtcb_logo.png"
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
                <Link
                  to="/booking/manage-ticket"
                  className={styles.subMenuLink}
                >
                  Quản Lý Vé
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link
                  to="/booking/payment-guide"
                  className={styles.subMenuLink}
                >
                  Hướng Dẫn
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link
                  to="/booking/cancel-ticket"
                  className={styles.subMenuLink}
                >
                  Điều kiện giá vé
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
                  Lịch Bay
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link
                  to="/info/special-services"
                  className={styles.subMenuLink}
                >
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
                  Hướng dẫn thủ Tục
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
                  Thông tin sân Bay
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
                  Tin tức
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
                <Link to="/info/general" className={styles.subMenuLink}>
                  Thông Tin Chung
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/qairline/about" className={styles.subMenuLink}>
                  Giới Thiệu
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/qairline/news" className={styles.subMenuLink}>
                  Trải nghiệm bay
                </Link>
              </li>
            </ul>
          </li>

          {/* Mục Tài Khoản */}
          <li className={`${styles.navItem} ${styles.account}`}>
            {isLoggedIn ? (
              <>
                <Link to="/account" className={styles.navLink}>
                  <img
                    src="/images/user.png"
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  Tài khoản
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
                    <Link to="/account/logout" className={styles.subMenuLink}>
                      Đăng Xuất
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <div className={styles.authLinks}>
                <Link to="/account/signin" className={styles.navLink}>
                  Đăng Nhập
                </Link>
                <span className={styles.separator}>|</span>
                <Link to="/account/signup" className={styles.navLink}>
                  Đăng Ký
                </Link>
              </div>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <div className={styles.notificationContainer}>
                {" "}
                <button
                  className={styles.notificationButton}
                  onClick={toggleNotification}
                >
                  {" "}
                  <FontAwesomeIcon icon={faBell} />{" "}
                  {notifications.length > 0 && (
                    <span className={styles.notificationBadge}>
                      {" "}
                      {notifications.length}{" "}
                    </span>
                  )}{" "}
                </button>{" "}
                {isNotificationOpen && (
                  <div className={styles.notificationDropdown}>
                    {" "}
                    <h3>Thông báo</h3>{" "}
                    {notifications.length > 0 ? (
                      <div className={styles.notificationList}>
                        {" "}
                        {notifications.map((notification) => (
                          <div
                            key={notification.notification_id}
                            className={styles.notificationItem}
                          >
                            {" "}
                            <div className={styles.notificationTitle}>
                              {" "}
                              {notification.title}{" "}
                            </div>{" "}
                            <div className={styles.notificationContent}>
                              {" "}
                              {notification.content}{" "}
                            </div>{" "}
                            <div className={styles.notificationTime}>
                              {" "}
                              {new Date(
                                notification.created_at
                              ).toLocaleDateString()}{" "}
                            </div>{" "}
                          </div>
                        ))}{" "}
                      </div>
                    ) : (
                      <p className={styles.noNotifications}>
                        {" "}
                        Không có thông báo mới{" "}
                      </p>
                    )}{" "}
                  </div>
                )}{" "}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
