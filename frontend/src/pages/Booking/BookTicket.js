import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FlightList from "../../components/FlightList";
import { getFlights, getAirports } from "../../services/api";

const BookTicket = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("one-way");
  const [departure_airport, setDeparture_airport] = useState("");
  const [arrival_airport, setArrival_airport] = useState("");
  const [departure_time, setDeparture_time] = useState("");
  const [arrival_time, setArrival_time] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [matchingFlight, setMatchingFlight] = useState([]);
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [user, setUser] = useState(null); 

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/me`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Lấy danh sách chuyến bay
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights();
        setFlights(response);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports();
        setAirports(response);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchAirports();
  }, []);

  const airport_names = airports.map((airport) => airport.city);
  // var matchingFlight = [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vui lòng đăng nhập trước khi đặt vé.");
      navigate("/account/signin");
      return;
    }

    const departure_airport_id = airports.find(
      (airport) => airport.city === departure_airport
    )?.airport_id;
    
    const arrival_airport_id = airports.find(
      (airport) => airport.city === arrival_airport
    )?.airport_id;
    
    // Tìm chuyến bay khớp
    var filter_flights = flights.filter((flight) =>
        flight.departure_airport === departure_airport_id &&
        flight.arrival_airport === arrival_airport_id &&
        flight.departure_time.split('T')[0] === departure_time
    );
    setMatchingFlight(filter_flights);

    if (!matchingFlight) {
      alert("Không tìm thấy chuyến bay phù hợp.");
      return;
    }
  }

  return (
    <div>
      <h1>Đặt vé</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={(e) => setTripType(e.target.value)}
            />
            Một chiều
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={(e) => setTripType(e.target.value)}
            />
            Khứ hồi
          </label>
        </div>
        <div>
          <label>Điểm khởi hành:</label>
          <select
            value={departure_airport}
            onChange={(e) => setDeparture_airport(e.target.value)}
            required
          >
            <option value="">-- Chọn sân bay --</option>
            {airport_names.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Điểm đến:</label>
          <select
            value={arrival_airport}
            onChange={(e) => setArrival_airport(e.target.value)}
            required
          >
            <option value="">-- Chọn sân bay --</option>
            {airport_names
              .filter((city) => city !== departure_airport)
              .map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Ngày đi:</label>
          <input
            type="date"
            value={departure_time}
            onChange={(e) => setDeparture_time(e.target.value)}
            required
          />
        </div>
        {tripType === "round-trip" && (
          <div>
            <label>Ngày về:</label>
            <input
              type="date"
              value={arrival_time}
              onChange={(e) => setArrival_time(e.target.value)}
              required={tripType === "round-trip"}
            />
          </div>
        )}
        <div>
          <label>Hành khách:</label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
            required
          />
        </div>
        <div>
          <button type="submit">Tìm chuyến bay</button>
        </div>
      </form>
      <div>
        <h2>Kết quả tìm kiếm</h2>
        {matchingFlight.length > 0 ? (
          <ul>
            {matchingFlight.map((flight) => (
              <li key={flight.flight_id}>
                <h3>Chuyến bay: {flight.flight_number}</h3>
                <strong>Khởi hành:</strong> {departure_airport} -{" "}
                {new Date(flight.departure_time).toLocaleString()} <br />
                <strong>Điểm đến:</strong> {arrival_airport} -{" "}
                {new Date(flight.arrival_time).toLocaleString()} <br />
                <strong>Thời gian bay:</strong> {flight.flight_duration} <br />
                <strong>Giá vé:</strong> {flight.price.toLocaleString()} VND <br />
                <strong>Ghế trống:</strong> {flight.available_seats} <br />
                <strong>Trạng thái:</strong> {flight.status} <br /><br />
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có chuyến bay phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
