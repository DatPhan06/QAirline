// frontend/src/services/bookingService.js

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động đính kèm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Đính kèm token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm tạo đặt vé mới
export const createBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post("/bookings/", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
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
