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

// Hàm tạo thông báo mới
export const createNotification = async (notificationData) => {
  try {
    const response = await axiosInstance.post(
      "/notifications/",
      notificationData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Hàm lấy thông báo theo ID
export const getNotificationById = async (notificationId) => {
  try {
    const response = await axiosInstance.get(
      `/notifications/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};

// Hàm lấy danh sách thông báo
export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get("/notifications/");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Hàm cập nhật thông báo
export const updateNotification = async (notificationId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/notifications/${notificationId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};

// Hàm xóa thông báo
export const deleteNotification = async (notificationId) => {
  try {
    const response = await axiosInstance.delete(
      `/notifications/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Hàm lấy thông báo cho người dùng cụ thể
export const getUserNotifications = async (userId) => {
  try {
    const response = await axiosInstance.get(`/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw error;
  }
};
