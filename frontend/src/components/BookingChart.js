import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import styles from "./BookingChart.module.css";

const BookingChart = ({
  monthlyStats,
  selectedMonth,
  selectedYear,
  handleMonthChange,
  handleYearChange,
}) => {
  useEffect(() => {
    console.log("monthlyStats:", monthlyStats);
  }, [monthlyStats]);

  // Sắp xếp dữ liệu theo thứ tự tháng tăng dần (khi xem tất cả các tháng)
  const sortedMonthlyStats = [...monthlyStats].sort(
    (a, b) => a.month - b.month
  );

  // Nếu đã chọn tháng cụ thể, hiển thị dữ liệu theo từng ngày
  const dailyData = monthlyStats.map((item) => ({
    day: item.day,
    bookings: item.bookings,
    revenue: item.revenue,
  }));

  // Quyết định dữ liệu cho biểu đồ
  const displayData = selectedMonth === 0 ? sortedMonthlyStats : dailyData;

  return (
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
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  Năm {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <BarChart width={600} height={300} data={displayData}>
        <XAxis dataKey={selectedMonth === 0 ? "month" : "day"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" fill="#8884d8" name="Số lượng đặt vé" />
        <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu" />
      </BarChart>
    </div>
  );
};

export default BookingChart;
