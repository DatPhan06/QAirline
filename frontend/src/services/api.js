// src/services/api.js

const API_URL = process.env.REACT_APP_API_URL;

export const getFlights = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/flights/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
