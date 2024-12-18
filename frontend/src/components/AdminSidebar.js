import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className={styles.sidebar}>
      <h2>Menu Quản Trị</h2>
      <ul>
        <li>
          <Link to="/admin/post-info">Đăng thông tin</Link>
        </li>
        <li>
          <Link to="/admin/manage-airplanes">Quản Lý Máy Bay</Link>
        </li>
        <li>
          <Link to="/admin/manage-flights">Quản Lý Chuyến Bay</Link>
        </li>
        <li>
          <Link to="/admin/view-bookings">
            Xem Và Thống Kê Đặt Vé Của Khách Hàng
          </Link>
        </li>
        <li>
          <Link to="/admin/account">Quản Lý Tài Khoản</Link>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Đăng Xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
