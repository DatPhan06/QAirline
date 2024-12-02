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

// Hàm tạo thông tin chung mới
export const createGeneralInfo = async (generalInfoData) => {
  try {
    const response = await axiosInstance.post("/general-info/", generalInfoData);
    return response.data;
  } catch (error) {
    console.error("Error creating general info:", error);
    throw error;
  }
};

// Hàm lấy thông tin chung theo ID
export const getGeneralInfoById = async (generalInfoId) => {
  try {
    const response = await axiosInstance.get(`/general-info/${generalInfoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching general info:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả thông tin chung
export const getGeneralInfo = async () => {
  try {
    const response = await axiosInstance.get("/general-info/");
    return response.data;
  } catch (error) {
    console.error("Error fetching general info:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin chung
export const updateGeneralInfo = async (generalInfoId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/general-info/${generalInfoId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating general info:", error);
    throw error;
  }
};

// Hàm xóa thông tin chung
export const deleteGeneralInfo = async (generalInfoId) => {
  try {
    const response = await axiosInstance.delete(`/general-info/${generalInfoId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting general info:", error);
    throw error;
  }
};
