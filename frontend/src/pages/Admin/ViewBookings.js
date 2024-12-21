import React, { useEffect, useState } from "react";
import {
  getBookingStats,
  getBookings,
  getBookingStatsByMonth,
  getGeneralStats,
} from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import BookingChart from "../../components/BookingChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./ViewBookings.module.css";

/**
 * ViewBookings component renders the admin view for booking statistics and booking list.
 * It includes functionalities for fetching and displaying general stats, monthly stats,
 * and bookings, as well as searching and paginating through the bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return <ViewBookings />
 *
 * @typedef {Object} Booking
 * @property {number} booked_ticket_id - The ID of the booked ticket.
 * @property {Object} user - The user who booked the ticket.
 * @property {string} user.full_name - The full name of the user.
 * @property {string} user.email - The email of the user.
 * @property {string} user.phone - The phone number of the user.
 * @property {Object} flight - The flight information.
 * @property {string} flight.flight_number - The flight number.
 * @property {Object} flight.departure_airport - The departure airport information.
 * @property {string} flight.departure_airport.name - The name of the departure airport.
 * @property {Object} flight.arrival_airport - The arrival airport information.
 * @property {string} flight.arrival_airport.name - The name of the arrival airport.
 * @property {string} status - The status of the booking.
 * @property {number} price - The price of the booking.
 * @property {Object} seat - The seat information.
 * @property {string} seat.seat_number - The seat number.
 *
 * @typedef {Object} Stats
 * @property {number} totalBookings - The total number of bookings.
 * @property {number} totalRevenue - The total revenue from bookings.
 * @property {number} totalAirplanes - The total number of airplanes.
 * @property {number} totalFlights - The total number of flights.
 *
 * @typedef {Object} MonthlyStats
 * @property {number} bookings - The number of bookings.
 * @property {number} revenue - The revenue from bookings.
 * @property {string} day - The day of the month.
 *
 * @typedef {Object} GeneralStats
 * @property {number} total_bookings - The total number of bookings.
 * @property {number} total_revenue - The total revenue from bookings.
 * @property {number} total_airplanes - The total number of airplanes.
 * @property {number} total_flights - The total number of flights.
 *
 * @typedef {Object} BookingStatsByMonth
 * @property {Array<MonthlyStats>} bookingsByMonth - The bookings grouped by month.
 * @property {Array<MonthlyStats>} bookingsByDay - The bookings grouped by day.
 *
 * @typedef {Object} UserData
 * @property {string} name - The username.
 * @property {number} bookings - The number of bookings by the user.
 *
 * @typedef {Object} FlightData
 * @property {string} name - The flight number.
 * @property {number} bookings - The number of bookings for the flight.
 */
const ViewBookings = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyStats, setMonthlyStats] = useState([]);

  const bookingsPerPage = 10; // Số đặt vé trên mỗi trang
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Add toggle function for guide
  const toggleGuide = () => {
    setIsGuideOpen(!isGuideOpen);
  };

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

    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
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
          // // Hiển thị dữ liệu từng ngày
          setMonthlyStats(data.bookingsByDay || []);
        }
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    };

    fetchMonthlyStats();
    fetchStats();
    fetchBookings();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const groupByFiveDays = (data) => {
    const groupedData = [];
    for (let i = 0; i < data.length; i += 5) {
      const group = data.slice(i, i + 5);
      const totalBookings = group.reduce((sum, item) => sum + item.bookings, 0);
      const totalRevenue = group.reduce((sum, item) => sum + item.revenue, 0);
      const startDay = group[0].day;
      const endDay = group[group.length - 1].day;
      groupedData.push({
        group: `${startDay}-${endDay}`,
        bookings: totalBookings,
        revenue: totalRevenue,
      });
    }
    return groupedData;
  };

  // Add handleBookingClick function
  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  if (!stats) {
    return <p>Đang tải dữ liệu thống kê...</p>;
  }

  // Lọc danh sách đặt vé dựa trên tìm kiếm
  const filteredBookings = bookings.filter((booking) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      booking.booked_ticket_id.toString().includes(searchTerm) ||
      booking.user_id.toString().includes(searchTerm) ||
      booking.flight_id.toString().includes(searchTerm) ||
      booking.status.toLowerCase().includes(searchTerm) ||
      // Add user information search
      booking.user?.full_name?.toLowerCase().includes(searchTerm) ||
      booking.user?.email?.toLowerCase().includes(searchTerm) ||
      booking.user?.phone?.toLowerCase().includes(searchTerm) ||
      // Add flight information search
      booking.flight?.flight_number?.toLowerCase().includes(searchTerm) ||
      booking.flight?.departure_airport?.name
        ?.toLowerCase()
        .includes(searchTerm) ||
      booking.flight?.arrival_airport?.name?.toLowerCase().includes(searchTerm)
    );
  });

  // Tính toán các đặt vé cho trang hiện tại
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Quay về trang 1 khi thay đổi tìm kiếm
  };

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

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

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>
          Thống kê đặt vé
          <button className={styles.guideButton} onClick={toggleGuide}>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
        </h1>

        <div className={styles.statsAndChartContainer}>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <h2>Tổng số đặt vé</h2>
              <p>{stats?.totalBookings ?? 0}</p>
            </div>
            <div className={styles.statCard}>
              <h2>Tổng doanh thu</h2>
              <p>{stats?.totalRevenue?.toLocaleString() || "0"} VND</p>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <BookingChart
              monthlyStats={monthlyStats}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              handleMonthChange={handleMonthChange}
              handleYearChange={handleYearChange}
            />
          </div>
        </div>

        <div className={styles.bookingsListContainer}>
          <h2 className={styles.sectionTitle}>
            DANH SÁCH ĐẶT VÉ
            <input
              type="text"
              placeholder="Tìm kiếm đặt vé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </h2>
          {filteredBookings.length === 0 ? (
            <p>Không có đặt vé nào.</p>
          ) : (
            <div>
              <table className={styles.bookingTable}>
                <thead>
                  <tr>
                    <th title="Mã đặt vé">Mã đặt vé</th>
                    <th title="Thông tin khách hàng">Khách hàng</th>
                    <th title="Thông tin chuyến bay">Chuyến bay</th>
                    <th title="Số ghế">Ghế</th>
                    <th title="Giá vé">Giá (VND)</th>
                    <th title="Trạng thái đặt vé">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking) => (
                    <tr
                      key={booking.booked_ticket_id}
                      onClick={() => handleBookingClick(booking)}
                    >
                      <td>{booking.booked_ticket_id}</td>
                      <td>
                        {booking.user?.full_name}
                        <br />
                        <span className={styles.subInfo}>
                          {booking.user?.email}
                        </span>
                      </td>
                      <td>
                        {booking.flight?.flight_number}
                        <br />
                        <span className={styles.subInfo}>
                          {new Date(
                            booking.flight?.departure_time
                          ).toLocaleString()}
                        </span>
                      </td>
                      <td>{booking.seat?.seat_number}</td>
                      <td>{booking.price?.toLocaleString()}</td>
                      <td>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>
                <span>
                  Trang {currentPage} /{" "}
                  {Math.ceil(filteredBookings.length / bookingsPerPage)}
                </span>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredBookings.length / bookingsPerPage)
                  }
                >
                  Trang sau
                </button>
              </div>
            </div>
          )}
        </div>
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
              {/* Thông tin đặt vé */}
              <div className={styles.detailSection}>
                <h3>Thông tin đặt vé</h3>
                <p>
                  <strong>ID Đặt Vé:</strong> {selectedBooking.booked_ticket_id}
                </p>
                <p>
                  <strong>Giá vé:</strong>{" "}
                  {selectedBooking.price.toLocaleString()} VND
                </p>
                <p>
                  <strong>Trạng thái:</strong> {selectedBooking.status}
                </p>
                <p>
                  <strong>Thời gian đặt:</strong>{" "}
                  {new Date(selectedBooking.booking_time).toLocaleString()}
                </p>
              </div>

              {/* Thông tin chuyến bay */}
              <div className={styles.detailSection}>
                <h3>Thông tin chuyến bay</h3>
                <p>
                  <strong>Mã chuyến bay:</strong>{" "}
                  {selectedBooking.flight?.flight_number}
                </p>
                <p>
                  <strong>Điểm khởi hành:</strong>{" "}
                  {selectedBooking.flight?.departure_airport?.name}
                </p>
                <p>
                  <strong>Điểm đến:</strong>{" "}
                  {selectedBooking.flight?.arrival_airport?.name}
                </p>
                <p>
                  <strong>Thời gian khởi hành:</strong>{" "}
                  {new Date(
                    selectedBooking.flight?.departure_time
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>Thời gian đến:</strong>{" "}
                  {new Date(
                    selectedBooking.flight?.arrival_time
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>Số ghế:</strong> {selectedBooking.seat?.seat_number}
                </p>
              </div>

              {/* Thông tin hành khách */}
              <div className={styles.detailSection}>
                <h3>Thông tin hành khách</h3>
                <p>
                  <strong>ID người dùng:</strong>{" "}
                  {selectedBooking.user?.user_id}
                </p>
                <p>
                  <strong>Tên:</strong> {selectedBooking.user?.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.user?.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedBooking.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isGuideOpen && (
        <div className={styles.modalOverlay} onClick={toggleGuide}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={toggleGuide}>
              ×
            </button>
            <div className={styles.guide}>
              <h2>Hướng dẫn sử dụng trang Thống kê</h2>

              <section>
                <h3>1. Thống kê tổng quan</h3>
                <ul>
                  <li>
                    <strong>Tổng số đặt vé:</strong>
                    <ul>
                      <li>Hiển thị tổng số vé đã được đặt trong hệ thống</li>
                      <li>Bao gồm cả vé đã hoàn thành và đã hủy</li>
                      <li>Cập nhật theo thời gian thực</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Tổng doanh thu:</strong>
                    <ul>
                      <li>Tổng giá trị từ các vé đã bán</li>
                      <li>Được tính bằng VND</li>
                      <li>Không bao gồm vé đã hủy</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h3>2. Đồ thị thống kê</h3>
                <ul>
                  <li>
                    <strong>Chọn thời gian:</strong>
                    <ul>
                      <li>Chọn tháng cụ thể hoặc xem tổng quan cả năm</li>
                      <li>Có thể chọn năm để xem dữ liệu quá khứ</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Đọc biểu đồ:</strong>
                    <ul>
                      <li>Cột xanh: Số lượng đặt vé</li>
                      <li>Cột cam: Doanh thu</li>
                      <li>Trục ngang: Thời gian (ngày hoặc tháng)</li>
                      <li>Trục dọc: Số lượng/Giá trị</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h3>3. Danh sách đặt vé</h3>
                <ul>
                  <li>
                    <strong>Tìm kiếm:</strong>
                    <ul>
                      <li>Tìm theo ID đặt vé, thông tin khách hàng</li>
                      <li>Tìm theo mã chuyến bay, sân bay</li>
                      <li>Lọc theo trạng thái vé</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Thông tin chi tiết:</strong>
                    <ul>
                      <li>Nhấp vào từng dòng để xem chi tiết đặt vé</li>
                      <li>Thông tin về hành khách và chuyến bay</li>
                      <li>Lịch sử đặt vé và thanh toán</li>
                    </ul>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
