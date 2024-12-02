import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động đính kèm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // Lấy token của admin từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Đính kèm token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm tạo máy bay mới
export const createAirplane = async (airplaneData) => {
  try {
    const response = await axiosInstance.post("/airplanes/", airplaneData);
    return response.data;
  } catch (error) {
    console.error("Error creating airplane:", error);
    throw error;
  }
};

// Hàm lấy thông tin máy bay theo ID
export const getAirplaneById = async (airplaneId) => {
  try {
    const response = await axiosInstance.get(`/airplanes/${airplaneId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching airplane:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả máy bay
export const getAirplanes = async () => {
  try {
    const response = await axiosInstance.get("/airplanes/");
    return response.data;
  } catch (error) {
    console.error("Error fetching airplanes:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin máy bay
export const updateAirplane = async (airplaneId, updateData) => {
  try {
    const response = await axiosInstance.put(
        `/airplanes/${airplaneId}`, 
        updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating airplane:", error);
    throw error;
  }
};

// Hàm xóa máy bay
export const deleteAirplane = async (airplaneId) => {
  try {
    const response = await axiosInstance.delete(`/airplanes/${airplaneId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting airplane:", error);
    throw error;
  }
};
