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

// Hàm tạo khuyến mãi mới
export const createPromotion = async (promotionData) => {
  try {
    const response = await axiosInstance.post("/promotions/", promotionData);
    return response.data;
  } catch (error) {
    console.error("Error creating promotion:", error);
    throw error;
  }
};

// Hàm lấy thông tin khuyến mãi theo ID
export const getPromotionById = async (promotionId) => {
  try {
    const response = await axiosInstance.get(`/promotions/${promotionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả khuyến mãi
export const getPromotions = async () => {
  try {
    const response = await axiosInstance.get("/promotions/");
    return response.data;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw error;
  }
};

// Hàm cập nhật khuyến mãi
export const updatePromotion = async (promotionId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/promotions/${promotionId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating promotion:", error);
    throw error;
  }
};

// Hàm xóa khuyến mãi
export const deletePromotion = async (promotionId) => {
  try {
    const response = await axiosInstance.delete(`/promotions/${promotionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting promotion:", error);
    throw error;
  }
};
