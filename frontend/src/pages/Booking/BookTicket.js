import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightList from "../../components/FlightList";

const BookTicket = () => {
  const [tripType, setTripType] = useState("one-way");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [flights, setFlights] = useState([]);
  const [user, setUser] = useState(null); 
  const airports = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Nha Trang"];

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flights/`);
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vui lòng đăng nhập trước khi đặt vé.");
      return;
    }

    // Lọc chuyến bay phù hợp
    const matchingFlight = flights.find(
      (flight) =>
        flight.departure === departure &&
        flight.destination === destination &&
        flight.departureDate === departureDate
    );

    if (!matchingFlight) {
      alert("Không tìm thấy chuyến bay phù hợp.");
      return;
    }

    const bookingData = JSON.stringify(
      {
        flight_id: matchingFlight.id,
        user_id: user.id,
        username: user.username,
        booking_date: new Date().toISOString().split('T')[0],
      }
    );
    console.log(bookingData)
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings/`, 
        bookingData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Vé của bạn đã được đặt thành công!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Đặt vé thất bại, vui lòng thử lại.");
    }
  };

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
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          >
            <option value="">-- Chọn sân bay --</option>
            {airports.map((airport) => (
              <option key={airport} value={airport}>
                {airport}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Điểm đến:</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">-- Chọn sân bay --</option>
            {airports
              .filter((airport) => airport !== departure)
              .map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Ngày đi:</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>
        {tripType === "round-trip" && (
          <div>
            <label>Ngày về:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required={tripType === "round-trip"}
            />
          </div>
        )}
        <div>
          <label>Người lớn:</label>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            required
          />
        </div>
        <div>
          <label>Trẻ em:</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <button type="submit">Đặt vé</button>
        </div>
      </form>
      <FlightList />
    </div>
  );
};

export default BookTicket;
