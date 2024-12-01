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

// Hàm tạo sân bay mới
export const createAirport = async (airportData) => {
  try {
    const response = await axiosInstance.post("/airports/", airportData);
    return response.data;
  } catch (error) {
    console.error("Error creating airport:", error);
    throw error;
  }
};

// Hàm lấy thông tin sân bay theo ID
export const getAirportById = async (airportId) => {
  try {
    const response = await axiosInstance.get(`/airports/${airportId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching airport:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả sân bay
export const getAirports = async () => {
  try {
    const response = await axiosInstance.get("/airports/");
    return response.data;
  } catch (error) {
    console.error("Error fetching airports:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin sân bay
export const updateAirport = async (airportId, updateData) => {
  try {
    const response = await axiosInstance.put(
        `/airports/${airportId}`, 
        updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating airport:", error);
    throw error;
  }
};

// Hàm xóa sân bay
export const deleteAirport = async (airportId) => {
  try {
    const response = await axiosInstance.delete(`/airports/${airportId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting airport:", error);
    throw error;
  }
};
