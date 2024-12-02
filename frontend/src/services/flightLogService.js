import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động đính kèm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Đính kèm token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm tạo nhật ký chuyến bay mới
export const createFlightLog = async (flightLogData) => {
  try {
    const response = await axiosInstance.post("/flightlogs/", flightLogData);
    return response.data;
  } catch (error) {
    console.error("Error creating flight log:", error);
    throw error;
  }
};

// Hàm lấy thông tin nhật ký chuyến bay theo ID
export const getFlightLogById = async (flightLogId) => {
  try {
    const response = await axiosInstance.get(`/flightlogs/${flightLogId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight log:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả nhật ký chuyến bay
export const getFlightLogs = async () => {
  try {
    const response = await axiosInstance.get("/flightlogs/");
    return response.data;
  } catch (error) {
    console.error("Error fetching flight logs:", error);
    throw error;
  }
};

// Hàm cập nhật nhật ký chuyến bay
export const updateFlightLog = async (flightLogId, updateData) => {
  try {
    const response = await axiosInstance.put(
        `/flightlogs/${flightLogId}`,
        updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating flight log:", error);
    throw error;
  }
};

// Hàm xóa nhật ký chuyến bay
export const deleteFlightLog = async (flightLogId) => {
  try {
    const response = await axiosInstance.delete(`/flightlogs/${flightLogId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting flight log:", error);
    throw error;
  }
};
