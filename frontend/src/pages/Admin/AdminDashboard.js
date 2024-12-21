// frontend/src/pages/Admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import BookingChart from "../../components/BookingChart";
import {
  getGeneralStats,
  getBookingStatsByMonth,
} from "../../services/adminService";
import styles from "./AdminDashboard.module.css";

/**
 * AdminDashboard component renders the admin dashboard page.
 * It displays general statistics and monthly booking statistics.
 * It also provides navigation to various admin management pages.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <AdminDashboard />
 * )
 *
 * @function
 * @name AdminDashboard
 *
 * @description
 * This component fetches general statistics and monthly booking statistics
 * from the server and displays them in a dashboard layout. It also includes
 * navigation links to other admin management pages such as managing airplanes,
 * flights, and viewing bookings.
 *
 * @property {function} useNavigate - Hook from react-router-dom for navigation.
 * @property {object} stats - State object containing general statistics.
 * @property {number} stats.totalBookings - Total number of bookings.
 * @property {number} stats.totalRevenue - Total revenue.
 * @property {number} stats.totalAirplanes - Total number of airplanes.
 * @property {number} stats.totalFlights - Total number of flights.
 * @property {number} selectedMonth - State for the selected month.
 * @property {number} selectedYear - State for the selected year.
 * @property {Array} monthlyStats - State array containing monthly booking statistics.
 *
 * @method
 * @name fetchStats
 * @description Fetches general statistics from the server and updates the state.
 *
 * @method
 * @name fetchMonthlyStats
 * @description Fetches monthly booking statistics from the server and updates the state.
 *
 * @method
 * @name handleMonthChange
 * @description Handles the change event for the month selection.
 * @param {object} e - The event object.
 *
 * @method
 * @name handleYearChange
 * @description Handles the change event for the year selection.
 * @param {object} e - The event object.
 *
 * @method
 * @name handleCardClick
 * @description Handles the click event for the statistic cards to navigate to different pages.
 * @param {string} path - The path to navigate to.
 */
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
          totalBookings: generalStats.total_bookings,
          totalRevenue: generalStats.total_revenue,
          totalAirplanes: generalStats.total_airplanes,
          totalFlights: generalStats.total_flights,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchMonthlyStats = async () => {
      try {
        const data = await getBookingStatsByMonth(
          selectedMonth === 0 ? null : selectedMonth,
          selectedYear
        );
        if (selectedMonth === 0) {
          // Hiển thị đủ 12 tháng
          setMonthlyStats(data.bookingsByMonth || []);
        } else {
          // Hiển thị dữ liệu từng ngày
          setMonthlyStats(data.bookingsByDay || []);
        }
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    };

    fetchStats();
    fetchMonthlyStats();
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
