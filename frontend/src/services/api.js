// src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token trong header
    },
});

// Hàm lấy danh sách chuyến bay
export const getFlights = async () => {
    try {
        const response = await axiosInstance.get("/flights/");
        return response.data; 
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error; 
    }
};

// Hàm lấy danh sách sân bay
export const getAirports = async () => {
    try {
        const response = await axiosInstance.get("/airports/");
        return response.data;
    } catch (error) {
        console.error("Error fetching airports:", error);
        throw error;
    }
};

