// frontend/src/pages/Admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import BookingChart from "../../components/BookingChart";
import { getGeneralStats } from "../../services/adminService";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalAirplanes: 0,
    totalFlights: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const generalStats = await getGeneralStats();
        setStats({
          totalBookings: generalStats.totalBookings,
          totalRevenue: generalStats.totalRevenue,
          totalAirplanes: generalStats.totalAirplanes,
          totalFlights: generalStats.totalFlights,
        });
        // Thêm dữ liệu thống kê theo tháng
        setMonthlyStats(generalStats.monthlyStats || []);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <h1>Trang Tổng Quan Admin</h1>
        <div className={styles.dashboardGrid}>
          <div className={styles.statsContainer}>
            <div
              className={styles.statCard}
              onClick={() => handleCardClick("/admin/view-bookings")}
            >
              <h2>Tổng số đặt vé</h2>
              <p>{stats.totalBookings}</p>
            </div>
            <div
              className={styles.statCard}
              onClick={() => handleCardClick("/admin/view-bookings")}
            >
              <h2>Tổng doanh thu</h2>
              <p>{stats.totalRevenue.toLocaleString()} VND</p>
            </div>
            <div
              className={styles.statCard}
              onClick={() => handleCardClick("/admin/manage-airplanes")}
            >
              <h2>Tổng số máy bay</h2>
              <p>{stats.totalAirplanes}</p>
            </div>
            <div
              className={styles.statCard}
              onClick={() => handleCardClick("/admin/manage-flights")}
            >
              <h2>Tổng số chuyến bay</h2>
              <p>{stats.totalFlights}</p>
            </div>
          </div>
          <BookingChart
            monthlyStats={monthlyStats}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Link to="/admin/post-info" className={styles.button}>
            Đăng Thông Tin
          </Link>
          <Link to="/admin/manage-airplanes" className={styles.button}>
            Quản Lý Máy Bay
          </Link>
          <Link to="/admin/manage-flights" className={styles.button}>
            Quản Lý Chuyến Bay
          </Link>
          <Link to="/admin/view-bookings" className={styles.button}>
            Xem Và Thống Kê Đặt Vé
          </Link>
          <Link to="/admin/account" className={styles.button}>
            Quản Lý Tài Khoản
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
