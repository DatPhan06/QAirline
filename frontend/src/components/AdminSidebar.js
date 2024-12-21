import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import {
  FaInfoCircle,
  FaPlane,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaUserShield,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
    // Add/remove shifted class from mainContent
    const mainContent = document.querySelector(".mainContent");
    if (mainContent) {
      mainContent.classList.toggle("shifted", isOpen);
    }
  };

  return (
    <>
      <div
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <Link to="/admin/dashboard">
          <h2>
            <img
              src="/images/ylogo.png"
              alt="QAirline Admin Logo"
              className={styles.adminLogo}
            />
            {"  "}
            <span className={styles.text}>Menu</span>
          </h2>
        </Link>
        <ul>
          <li>
            <Link to="/admin/post-info">
              <FaInfoCircle className={styles.icon} />
              <span className={styles.text}>Đăng thông tin</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-airplanes">
              <FaPlane className={styles.icon} />
              <span className={styles.text}>Quản Lý Máy Bay</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-airports">
              <FaMapMarkerAlt className={styles.icon} />
              <span className={styles.text}>Quản Lý Sân Bay</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-flights">
              <FaClipboardList className={styles.icon} />
              <span className={styles.text}>Quản Lý Chuyến Bay</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/view-bookings">
              <FaChartBar className={styles.icon} />
              <span className={styles.text}>Xem Và Thống Kê Đặt Vé</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/account">
              <FaUserShield className={styles.icon} />
              <span className={styles.text}>Quản Lý Tài Khoản</span>
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.icon} />
          <span className={styles.text}>Đăng Xuất</span>
        </button>
      </div>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
      />
    </>
  );
};

export default AdminSidebar;
