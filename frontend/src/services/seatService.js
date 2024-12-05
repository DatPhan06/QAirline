import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động đính kèm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm tạo ghế mới
export const createSeat = async (seatData) => {
  try {
    const response = await axiosInstance.post("/seats/", seatData);
    return response.data;
  } catch (error) {
    console.error("Error creating seat:", error);
    throw error;
  }
};

// Hàm lấy danh sách chỗ ngồi theo máy bay
export const getSeatsByAirplaneId = async (airplaneId) => {
  try {
    const response = await axiosInstance.get(`/seats/airplane/${airplaneId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seats by airplane:", error);
    throw error;
  }
};

// Hàm lấy thông tin ghế theo ID
export const getSeatById = async (seatId) => {
  try {
    const response = await axiosInstance.get(`/seats/${seatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seat:", error);
    throw error;
  }
};

// Hàm lấy danh sách ghế
export const getSeats = async () => {
  try {
    const response = await axiosInstance.get("/seats/");
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

// Hàm cập nhật ghế
export const updateSeat = async (seatId, updateData) => {
  try {
    const response = await axiosInstance.put(`/seats/${seatId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating seat:", error);
    throw error;
  }
};

// Hàm xóa ghế
export const deleteSeat = async (seatId) => {
  try {
    const response = await axiosInstance.delete(`/seats/${seatId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seat:", error);
    throw error;
  }
};
