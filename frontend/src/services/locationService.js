import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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

// Hàm lấy danh sách tất cả locations
export const getLocations = async () => {
  try {
    const response = await axiosInstance.get("/locations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Hàm lấy location theo ID
export const getLocationById = async (locationId) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

export default axiosInstance;