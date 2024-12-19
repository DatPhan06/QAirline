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
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <h2>
        <FaUserShield className={styles.icon} />
        <span className={styles.text}>Menu Quản Trị</span>
      </h2>
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
          <Link to="/admin/manage-flights">
            <FaClipboardList className={styles.icon} />
            <span className={styles.text}>Quản Lý Chuyến Bay</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/view-bookings">
            <FaChartBar className={styles.icon} />
            <span className={styles.text}>
              Xem Và Thống Kê Đặt Vé Của Khách Hàng
            </span>
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className={styles.logoutButton}>
        <FaSignOutAlt className={styles.icon} />
        <span className={styles.text}>Đăng Xuất</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
