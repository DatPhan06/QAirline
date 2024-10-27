import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/flights/";

export const getFlights = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
