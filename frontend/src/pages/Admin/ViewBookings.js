import React, { useEffect, useState } from "react";
import {
  getBookingStats,
  getBookings,
  getBookingStatsByMonth,
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

    const fetchMonthlyStats = async () => {
      try {
        const data = await getBookingStatsByMonth(
          selectedMonth === 0 ? null : selectedMonth,
          selectedYear
        );
        if (selectedMonth === 0) {
          // Hiển thị theo 12 tháng trong năm
          setMonthlyStats(data.bookingsByMonth);
        } else {
          // Hiển thị theo nhóm 5 ngày trong tháng
          const groupedData = groupByFiveDays(data.bookingsByDay);
          setMonthlyStats(groupedData);
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
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.booked_ticket_id.toString().includes(searchQuery) ||
      booking.user_id.toString().includes(searchQuery) ||
      booking.flight_id.toString().includes(searchQuery) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1>Thống kê đặt vé</h1>

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
          <div className={styles.chartHeader}>
            <h2>Đặt vé theo tháng</h2>
            <div className={styles.dateSelectors}>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className={styles.select}
              >
                <option value={0}>Tất cả các tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className={styles.select}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i + 1;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <BarChart width={600} height={300} data={monthlyStats}>
            <XAxis dataKey={selectedMonth === 0 ? "month" : "group"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" name="Số lượng đặt vé" fill="#8884d8" />
            <Bar dataKey="revenue" name="Doanh thu (VND)" fill="#82ca9d" />
          </BarChart>
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
                <strong>ID Đặt Vé:</strong> {selectedBooking.booked_ticket_id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedBooking.user_id}
              </p>
              <p>
                <strong>Flight ID:</strong> {selectedBooking.flight_id}
              </p>
              <p>
                <strong>Ticket ID:</strong> {selectedBooking.ticket_id}
              </p>
              <p>
                <strong>Giá:</strong> {selectedBooking.price.toLocaleString()}{" "}
                VND
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
  );
};

export default ViewBookings;
