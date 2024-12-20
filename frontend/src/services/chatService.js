import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Thêm interceptor để tự động đính kèm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Hoặc "adminToken" nếu cần
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm lấy nội dung của trang web hiện tại
const getPageContent = () => {
  const content = document.body.innerText || document.body.textContent;
  return content;
};

// Hàm gửi tin nhắn tới chatbot
export const sendMessage = async (message) => {
  try {
    const payload = {
      message: message,
      context: {
        current_page: window.location.pathname,
        page_content: getPageContent(),
      },
    };

    // Gửi yêu cầu POST với payload trong body
    const response = await axiosInstance.post("/chat", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
