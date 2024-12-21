import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getUserNotifications } from "../services/notificationService";
import { getCurrentUser } from "../services/userService";
import styles from "./Navbar.module.css";
import Markdown from "markdown-to-jsx";

/**
 * Thành phần Navbar hiển thị thanh điều hướng của trang web.
 * Bao gồm các mục chính như Đặt Vé, Thông Tin Hành Trình, Khám Phá, QAirline và Tài Khoản.
 *
 * @component
 * @returns {JSX.Element} Thành phần Navbar.
 */
/**
 * Navbar component that renders the navigation bar with various menu items and user account options.
 * It also handles fetching notifications and user data, and displays notifications in a modal.
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @function
 * @name Navbar
 *
 * @description
 * The Navbar component manages the state for menu and notification toggles, fetches user data and notifications,
 * and displays them in a dropdown and modal. It also provides navigation links for different sections of the application.
 *
 * @property {boolean} isMenuOpen - State to track if the menu is open.
 * @property {function} setIsMenuOpen - Function to set the state of isMenuOpen.
 * @property {boolean} isNotificationOpen - State to track if the notification dropdown is open.
 * @property {function} setIsNotificationOpen - Function to set the state of isNotificationOpen.
 * @property {Array} notifications - State to store the list of notifications.
 * @property {function} setNotifications - Function to set the state of notifications.
 * @property {Object|null} currentUser - State to store the current user data.
 * @property {function} setCurrentUser - Function to set the state of currentUser.
 * @property {Object|null} selectedNotification - State to store the selected notification for the modal.
 * @property {function} setSelectedNotification - Function to set the state of selectedNotification.
 * @property {boolean} isModalOpen - State to track if the notification modal is open.
 * @property {function} setIsModalOpen - Function to set the state of isModalOpen.
 * @property {string|null} token - The authentication token retrieved from localStorage.
 * @property {boolean} isLoggedIn - Boolean indicating if the user is logged in.
 *
 * @method fetchNotifications
 * @description Fetches notifications from the server and updates the notifications state.
 *
 * @method fetchUserAndNotifications
 * @description Fetches the current user data and their notifications if the user is logged in.
 *
 * @method toggleNotification
 * @description Toggles the state of the notification dropdown.
 *
 * @method toggleMenu
 * @description Toggles the state of the menu.
 *
 * @method handleNotificationClick
 * @description Handles the click event on a notification item, sets the selected notification, and opens the modal.
 *
 * @method handleCloseModal
 * @description Handles the event to close the notification modal.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Handler for notification click
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
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
            <p className={styles.navLink}>ĐẶT VÉ</p>
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
            <p className={styles.navLink}>THÔNG TIN HÀNH TRÌNH</p>
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
            <p className={styles.navLink}>KHÁM PHÁ</p>
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
                <Link to="/qairline/news" className={styles.subMenuLink}>
                  Tin tức
                </Link>
              </li>
            </ul>
          </li>

          {/* Mục Hãng Hàng Không */}
          <li className={styles.navItem}>
            <p className={styles.navLink}>QAirline</p>
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
                <Link
                  to="/explore/flight-experience"
                  className={styles.subMenuLink}
                >
                  Trải nghiệm bay
                </Link>
              </li>
            </ul>
          </li>

          {/* Mục Tài Khoản */}
          <li className={`${styles.navItem} ${styles.account}`}>
            {isLoggedIn ? (
              <>
                <p className={styles.navLink}>
                  <img
                    src="/images/user.png"
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  Tài khoản
                </p>
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
                    <h3>Thông báo</h3>
                    {notifications.length > 0 ? (
                      <div className={styles.notificationList}>
                        {notifications.map((notification) => (
                          <div
                            key={notification.notification_id}
                            className={styles.notificationItem}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className={styles.notificationTitle}>
                              {notification.title}
                            </div>
                            <div className={styles.notificationContent}>
                              {notification.content.replace(
                                /\*\*(.*?)\*\*/g,
                                "$1"
                              )}{" "}
                            </div>
                            <div className={styles.notificationTime}>
                              {new Date(
                                notification.created_at
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.noNotifications}>
                        Không có thông báo mới
                      </p>
                    )}
                  </div>
                )}
                {/* Notification Detail Modal */}
                {isModalOpen && selectedNotification && (
                  <div
                    className={styles.modalOverlay}
                    onClick={handleCloseModal}
                  >
                    <div
                      className={styles.modalContent}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={styles.closeButton}
                        onClick={handleCloseModal}
                      >
                        ×
                      </button>
                      <div className={styles.notificationDetail}>
                        <h2>{selectedNotification.title}</h2>
                        <div className={styles.notificationInfo}>
                          <p className={styles.notificationTime}>
                            {new Date(
                              selectedNotification.created_at
                            ).toLocaleString()}
                          </p>
                          {selectedNotification.type && (
                            <p className={styles.notificationType}>
                              Loại: {selectedNotification.type}
                            </p>
                          )}
                        </div>
                        <div className={styles.notificationBody}>
                          <Markdown
                            options={{
                              forceBlock: true,
                              overrides: {
                                strong: {
                                  component: "strong",
                                  props: {
                                    className: styles.markdownStrong,
                                  },
                                },
                                p: {
                                  component: "p",
                                  props: {
                                    className: styles.markdownParagraph,
                                  },
                                },
                                ul: {
                                  component: "ul",
                                  props: {
                                    className: styles.markdownList,
                                  },
                                },
                                li: {
                                  component: "li",
                                  props: {
                                    className: styles.markdownListItem,
                                  },
                                },
                              },
                            }}
                          >
                            {/* Remove extra spaces and tabs from notification content */}
                            {selectedNotification.content
                              .trim()
                              .replace(/^\s+/gm, "")}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
