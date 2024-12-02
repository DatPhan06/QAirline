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

// Hàm đăng ký admin mới
export const registerAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post("/admin/register", adminData);
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

// Hàm đăng nhập admin
export const loginAdmin = async (username, password) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  try {
    const response = await axiosInstance.post("/admin/login",
      params, 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during admin login:", error);
    throw error;
  }
};

// Hàm lấy thông tin admin hiện tại
export const getCurrentAdmin = async () => {
  try {
    const response = await axiosInstance.get("/admin/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current admin:", error);
    throw error;
  }
};

// Hàm lấy danh sách tất cả admin
export const getAdmins = async () => {
  try {
    const response = await axiosInstance.get("/admin/");
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

// Hàm lấy thông tin admin theo ID
export const getAdminById = async (adminId) => {
  try {
    const response = await axiosInstance.get(`/admin/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin admin
export const updateAdmin = async (adminId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/admin/${adminId}`, 
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

// Hàm xóa admin
export const deleteAdmin = async (adminId) => {
  try {
    const response = await axiosInstance.delete(`/admin/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
