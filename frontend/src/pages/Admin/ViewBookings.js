import React, { useEffect, useState } from "react";
import { getBookingStats, getBookings } from "../../services/bookingService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./ViewBookings.module.css";

const ViewBookings = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 10; // Số đặt vé trên mỗi trang

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getBookingStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchStats();
    fetchBookings();
  }, []);

  if (!stats) {
    return <p>Đang tải dữ liệu thống kê...</p>;
  }

  // Tính toán các đặt vé cho trang hiện tại
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sử dụng tên thuộc tính đúng từ API
  const userData =
    stats.bookingsByUser?.map((item) => ({
      name: item.username,
      bookings: item.bookings,
    })) || [];

  const flightData =
    stats.bookingsByFlight?.map((item) => ({
      name: item.flightNumber,
      bookings: item.bookings,
    })) || [];

  console.log("User Data:", userData);
  console.log("Flight Data:", flightData);
  console.log("Bookings List:", bookings);

  // Hàm xử lý khi nhấp vào một hàng trong bảng
  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <h1>Thống kê đặt vé</h1>

          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <h2>Tổng số đặt vé</h2>
              <p>{stats.totalBookings ?? 0}</p>
            </div>
            <div className={styles.statCard}>
              <h2>Tổng doanh thu</h2>
              <p>{stats.totalRevenue?.toLocaleString() || "0"} VND</p>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <h2>Đặt vé theo người dùng</h2>
            <BarChart width={600} height={300} data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </div>

          <div className={styles.chartContainer}>
            <h2>Đặt vé theo chuyến bay</h2>
            <PieChart width={600} height={400}>
              <Pie
                data={flightData}
                dataKey="bookings"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#82ca9d"
                label
              >
                {flightData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={"#" + (((1 << 24) * Math.random()) | 0).toString(16)}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.bookingsListContainer}>
            <h2>Danh Sách Đặt Vé</h2>
            {bookings.length === 0 ? (
              <p>Không có đặt vé nào.</p>
            ) : (
              <div>
                <table className={styles.bookingsTable}>
                  <thead>
                    <tr>
                      <th>ID Đặt Vé</th>
                      <th>User ID</th>
                      <th>Flight ID</th>
                      <th>Giá</th>
                      <th>Trạng Thái</th>
                      <th>Ngày Đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((booking) => (
                      <tr
                        key={booking.booked_ticket_id}
                        onClick={() => handleRowClick(booking)}
                        className={styles.tableRow}
                      >
                        {" "}
                        <td>{booking.booked_ticket_id}</td>
                        <td>{booking.user_id}</td>
                        <td>{booking.flight_id}</td>
                        <td>{booking.price.toLocaleString()} VND</td>
                        <td>{booking.status}</td>
                        <td>
                          {new Date(booking.booking_time).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.pagination}>
                  {Array.from(
                    { length: Math.ceil(bookings.length / bookingsPerPage) },
                    (_, i) => i + 1
                  ).map((number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`${styles.pageButton} ${
                        currentPage === number ? styles.activePage : ""
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cửa sổ Modal hiển thị chi tiết đặt vé */}
          {isModalOpen && selectedBooking && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.closeButton} onClick={closeModal}>
                  &times;
                </span>
                <h2>Chi Tiết Đặt Vé</h2>
                <div className={styles.modalDetails}>
                  <p>
                    <strong>ID Đặt Vé:</strong>{" "}
                    {selectedBooking.booked_ticket_id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {selectedBooking.user_id}
                  </p>
                  <p>
                    <strong>Flight ID:</strong> {selectedBooking.flight_id}
                  </p>
                  <p>
                    <strong>Số Ghế:</strong> {selectedBooking.seat_id}
                  </p>
                  <p>
                    <strong>Ticket ID:</strong> {selectedBooking.ticket_id}
                  </p>
                  <p>
                    <strong>Giá:</strong>{" "}
                    {selectedBooking.price.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Trạng Thái:</strong> {selectedBooking.status}
                  </p>
                  <p>
                    <strong>Ngày Đặt:</strong>{" "}
                    {new Date(selectedBooking.booking_time).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
