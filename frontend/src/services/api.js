// src/services/api.js
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

// Hàm lấy danh sách chuyến bay
export const getFlights = async () => {
  try {
    const response = await axiosInstance.get("/flights/");
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// Hàm lấy danh sách sân bay
export const getAirports = async () => {
  try {
    const response = await axiosInstance.get("/airports/");
    return response.data;
  } catch (error) {
    console.error("Error fetching airports:", error);
    throw error;
  }
};
