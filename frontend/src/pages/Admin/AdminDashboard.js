// frontend/src/pages/Admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
// import { Bar } from "react-chartjs-2";
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
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const chartData = {
    labels: ["Bookings", "Revenue", "Airplanes", "Flights"],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.totalBookings,
          stats.totalRevenue,
          stats.totalAirplanes,
          stats.totalFlights,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
      },
    ],
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <h1>Trang Tổng Quan Admin</h1>
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
        <div className={styles.chartContainer}>
          <h2>Thống Kê Tổng Quát</h2>
          {/* <Bar data={chartData} /> */}
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
