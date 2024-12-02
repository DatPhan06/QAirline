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

// Hàm tạo bài viết mới
export const createNews = async (newsData) => {
  try {
    const response = await axiosInstance.post("/news/", newsData);
    return response.data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

// Hàm lấy bài viết theo ID
export const getNewsById = async (newsId) => {
  try {
    const response = await axiosInstance.get(`/news/${newsId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả bài viết
export const getNews = async () => {
  try {
    const response = await axiosInstance.get("/news/");
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Hàm cập nhật bài viết
export const updateNews = async (newsId, updateData) => {
  try {
    const response = await axiosInstance.put(
        `/news/${newsId}`, 
        updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

// Hàm xóa bài viết
export const deleteNews = async (newsId) => {
  try {
    const response = await axiosInstance.delete(`/news/${newsId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
