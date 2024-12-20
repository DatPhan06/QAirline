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
  // Tạo dữ liệu cho tất cả 12 tháng
  const getAllMonthsData = () => {
    // Khởi tạo mảng 12 tháng với giá trị mặc định là 0
    const allMonths = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      bookings: 0,
      revenue: 0,
    }));

    // Cập nhật giá trị cho các tháng có dữ liệu
    monthlyStats.forEach((stat) => {
      if (stat.month) {
        allMonths[stat.month - 1] = {
          month: stat.month,
          bookings: stat.bookings || 0,
          revenue: stat.revenue || 0,
        };
      }
    });

    return allMonths;
  };

  // Format data based on selection
  const getChartData = () => {
    if (selectedMonth === 0) {
      // Show all months
      return getAllMonthsData().map((item) => ({
        ...item,
        name: `Tháng ${item.month}`,
      }));
    } else {
      // Show daily data for selected month
      return monthlyStats
        .sort((a, b) => a.day - b.day) // Sort by day number
        .map((item) => ({
          ...item,
          name: `${item.day}`,
          bookings: item.bookings || 0,
          revenue: item.revenue || 0,
        }));
    }
  };

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

  const displayData = getChartData();

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2>
          {selectedMonth === 0
            ? "Thống kê theo tháng"
            : `Thống kê tháng ${selectedMonth}`}
        </h2>{" "}
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

      <BarChart width={750} height={300} data={displayData}>
        <XAxis
          dataKey="name"
          label={{
            value: selectedMonth === 0 ? "Tháng" : "Ngày",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          yAxisId="bookings"
          orientation="left"
          domain={[0, "dataMax + 5"]} // Adjust the domain for bookings
        />
        <YAxis
          yAxisId="revenue"
          orientation="right"
          domain={[0, "dataMax + 1000000"]} // Adjust the domain for revenue
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="bookings"
          fill="#8884d8"
          name="Số lượng đặt vé"
          yAxisId="bookings"
          maxBarSize={50} // Control maximum bar width
        />
        <Bar
          dataKey="revenue"
          fill="#82ca9d"
          name="Doanh thu"
          yAxisId="revenue"
          maxBarSize={50} // Control maximum bar width
        />
      </BarChart>
    </div>
  );
};

export default BookingChart;
