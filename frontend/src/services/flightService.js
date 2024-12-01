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

// Lấy danh sách các chuyến bay
export const getFlights = async () => {
  try {
    const response = await axiosInstance.get("/flights/");
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// Lấy thông tin chi tiết của một chuyến bay theo ID
export const getFlightById = async (flightId) => {
  try {
    const response = await axiosInstance.get(`/flights/${flightId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight:", error);
    throw error;
  }
};

// Tạo một chuyến bay mới
export const createFlight = async (flightData) => {
  try {
    const response = await axiosInstance.post("/flights/", flightData);
    return response.data;
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};

// Cập nhật thông tin của một chuyến bay
export const updateFlight = async (flightId, flightData) => {
  try {
    const response = await axiosInstance.put(
      `/flights/${flightId}`,
      flightData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating flight:", error);
    throw error;
  }
};

// Xóa một chuyến bay
export const deleteFlight = async (flightId) => {
  try {
    const response = await axiosInstance.delete(`/flights/${flightId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting flight:", error);
    throw error;
  }
};
