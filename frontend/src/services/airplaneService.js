import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add interceptor to automatically attach token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get all airplanes
export const getAirplanes = async () => {
  try {
    const response = await axiosInstance.get("/airplanes/");
    return response.data;
  } catch (error) {
    console.error("Error fetching airplanes:", error);
    throw error;
  }
};

// Get airplane by ID
export const getAirplaneById = async (airplaneId) => {
  try {
    const response = await axiosInstance.get(`/airplanes/${airplaneId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching airplane:", error);
    throw error;
  }
};

// Create a new airplane
export const createAirplane = async (airplaneData) => {
  try {
    const response = await axiosInstance.post("/airplanes/", airplaneData);
    return response.data;
  } catch (error) {
    console.error("Error creating airplane:", error);
    throw error;
  }
};

// Update an airplane
export const updateAirplane = async (airplaneId, airplaneData) => {
  try {
    const response = await axiosInstance.put(
      `/airplanes/${airplaneId}`,
      airplaneData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating airplane:", error);
    throw error;
  }
};

// Delete an airplane
export const deleteAirplane = async (airplaneId) => {
  try {
    const response = await axiosInstance.delete(`/airplanes/${airplaneId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting airplane:", error);
    throw error;
  }
};
