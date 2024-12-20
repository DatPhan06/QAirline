import React, { useEffect, useState } from "react";
import {
  getBookingStats,
  getBookings,
  getBookingStatsByMonth,
  getGeneralStats,
} from "../../services/adminService";
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
import BookingChart from "../../components/BookingChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./ViewBookings.module.css";

const ViewBookings = () => {
  const [stats, setStats] = useState(null);
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
          <h2>Danh Sách Đặt Vé</h2>
          {/* Thanh tìm kiếm */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Tìm kiếm đặt vé..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          {filteredBookings.length === 0 ? (
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
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>
                <span>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
