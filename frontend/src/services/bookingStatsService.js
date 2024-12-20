// frontend/src/services/bookingStatsService.js
import { getBookingStatsByMonth } from "./adminService";

export const fetchBookingStats = async (selectedMonth, selectedYear) => {
  try {
    const data = await getBookingStatsByMonth(
      selectedMonth === 0 ? null : selectedMonth,
      selectedYear
    );
    return data;
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    throw error;
  }
};
