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
    const response = await axiosInstance.post("/admin/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
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
    const response = await axiosInstance.put(`/admin/${adminId}`, updateData);
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

// Hàm lấy thống kê đặt vé
export const getBookingStats = async () => {
  try {
    const response = await axiosInstance.get("/bookings/stats/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    throw error;
  }
};

// Hàm tạo đặt vé mới
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vui lòng đăng nhập để đặt vé");
    }

    const response = await axiosInstance.post("/bookings/", bookingData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
    }
    throw error;
  }
};

// Hàm lấy danh sách vé đã đặt
export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Hàm lấy thông tin vé đã đặt theo ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// Hàm cập nhật vé đã đặt
export const updateBooking = async (bookingId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/bookings/${bookingId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Hàm xóa vé đã đặt
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const createAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post("/admin/register", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Hàm lấy thống kê đặt vé theo tháng
export const getBookingStatsByMonth = async (month, year) => {
  try {
    const response = await axiosInstance.get(`/bookings/stats/overview`, {
      params: {
        month: month || undefined,
        year: year,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking stats by month:", error);
    throw error;
  }
};
