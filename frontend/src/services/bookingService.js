import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Update interceptor to handle both user and admin tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${userToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm lấy thống kê đặt vé
export const getBookingStats = async () => {
  try {
    const response = await axiosInstance.get("/bookings/stats/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    throw error;
  }
};

// Hàm tạo đặt vé mới
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vui lòng đăng nhập để đặt vé");
    }

    const response = await axiosInstance.post("/bookings/", bookingData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
    }
    throw error;
  }
};

// Hàm lấy danh sách vé đã đặt
export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Hàm lấy thông tin vé đã đặt theo ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// Hàm lấy thông tin booking theo ticket_id
export const getBookingByTicketId = async (ticketId) => {
  try {
    const response = await axiosInstance.get(`/bookings/ticket/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking by ticket ID:", error);
    throw error;
  }
};

// Hàm lấy thông tin booking theo ticket_id
export const getBookingsByTicketId = async (ticketId) => {
  try {
    const response = await axiosInstance.get(`/bookings/ticket/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking by ticket ID:", error);
    throw error;
  }
};

// Hàm cập nhật vé đã đặt
export const updateBooking = async (bookingId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/bookings/${bookingId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Hàm xóa vé đã đặt
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
