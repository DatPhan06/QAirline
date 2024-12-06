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

// Hàm tạo vé mới
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post("/tickets/", ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

// Hàm lấy thông tin vé theo ID
export const getTicketById = async (ticketId) => {
  try {
    const response = await axiosInstance.get(`/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

// Hàm lấy danh sách vé
export const getTickets = async () => {
  try {
    const response = await axiosInstance.get("/tickets/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

// Hàm cập nhật vé
export const updateTicket = async (ticketId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/tickets/${ticketId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
};

// Hàm xóa vé
export const deleteTicket = async (ticketId) => {
  try {
    const response = await axiosInstance.delete(`/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
};

// Hàm lấy vé theo flight_id và seat_id
export const getTicketByFlightAndSeat = async (flightId, seatId) => {
  try {
    const response = await axiosInstance.get(
      `/tickets/flight/${flightId}/seat/${seatId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket by flight and seat:", error);
    throw error;
  }
};

// Hàm tạo tất cả vé cho một chuyến bay
export const createTicketsForFlight = async (flightId) => {
  try {
    const response = await axiosInstance.post(
      `/tickets/flight/${flightId}/create-all`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating tickets for flight:", error);
    throw error;
  }
};

// Hàm lấy tất cả vé theo flight_id
export const getTicketsByFlightId = async (flightId) => {
  try {
    const response = await axiosInstance.get(`/tickets/flight/${flightId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets by flight:", error);
    throw error;
  }
};
