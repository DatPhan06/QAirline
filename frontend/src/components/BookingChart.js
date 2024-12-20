// frontend/src/components/BookingChart.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import styles from "./BookingChart.module.css";

const BookingChart = ({
  monthlyStats,
  selectedMonth,
  selectedYear,
  handleMonthChange,
  handleYearChange,
}) => {
  // Hàm xử lý logic nhóm dữ liệu theo ngày
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

  // Xử lý data hiển thị biểu đồ
  const displayData =
    selectedMonth === 0 ? monthlyStats : groupByFiveDays(monthlyStats);

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
      <BarChart width={600} height={300} data={displayData}>
        <XAxis dataKey={selectedMonth === 0 ? "month" : "group"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" name="Số lượng đặt vé" fill="#8884d8" />
        <Bar dataKey="revenue" name="Doanh thu (VND)" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BookingChart;
