import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./BookTicket.module.css";
import FlightList from "../../components/FlightList";
import { getFlights } from "../../services/flightService";
import { getAirports } from "../../services/airportService";
import { getCurrentUser } from "../../services/userService";
import FlightDetail from "../../components/FlightDetail";

const BookTicket = () => {
  const [departure_airport, setDeparture_airport] = useState("");
  const [arrival_airport, setArrival_airport] = useState("");
  const [departure_time, setDeparture_time] = useState("");
  const [arrival_time, setArrival_time] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [passengers, setPassengers] = useState(1);
  const [matchingFlight, setMatchingFlight] = useState([]);
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [user, setUser] = useState(null);
  const [showMatchingFlights, setShowMatchingFlights] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const location = useLocation();
  const searchParams = location.state?.searchParams;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

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
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);

  // Hàm tìm kiếm chuyến bay
  const searchFlights = (
    departure,
    arrival,
    departureDate,
    returnDate,
    passengers,
    tripType
  ) => {
    const filter_flights = flights.filter((flight) => {
      const departureMatch = flight.departure_airport.city === departure;
      const arrivalMatch = flight.arrival_airport.city === arrival;
      const dateMatch = flight.departure_time.split("T")[0] === departureDate;

      // Nếu là khứ hồi, kiểm tra thêm ngày về
      if (tripType === "round-trip") {
        const returnDateMatch = flight.return_time
          ? flight.return_time.split("T")[0] === returnDate
          : false;
        return departureMatch && arrivalMatch && dateMatch && returnDateMatch;
      }

      return departureMatch && arrivalMatch && dateMatch;
    });

    setMatchingFlight(filter_flights);
    setShowMatchingFlights(true);

    if (filter_flights.length === 0) {
      alert("Không tìm thấy chuyến bay phù hợp.");
    }
  };

  // Trình xử lý sự kiện submit
  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    searchFlights(
      departure_airport,
      arrival_airport,
      departure_time,
      arrival_time,
      passengers,
      tripType
    );
  };

  // useEffect để tự động tìm kiếm khi nhận được searchParams và flights đã được tải
  useEffect(() => {
    if (searchParams && flights.length > 0) {
      const {
        departure,
        arrival,
        tripType,
        departureDate,
        returnDate,
        passengers,
      } = searchParams;

      setDeparture_airport(departure);
      setArrival_airport(arrival);
      setTripType(tripType);
      setDeparture_time(departureDate);
      setArrival_time(returnDate);
      setPassengers(passengers);

      // Thực hiện tìm kiếm trực tiếp với các tham số
      searchFlights(departure, arrival, departureDate, returnDate, passengers, tripType);
    }
  }, [searchParams, flights]);

  const airport_names = airports.map((airport) => airport.city);

  return (
    <div className={styles.bookingContainer}>
      {/* Khung đặt vé */}
      <div className={styles.bookingForm}>
        <div className={styles.headingcontainer}>
          <h1 className={styles.heading}>ĐẶT VÉ </h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Loại chuyến đi */}
          <div className={styles.tripType}>
            <label>
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={(e) => setTripType(e.target.value)}
                className={styles.radio}
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
                className={styles.radio}
              />
              Khứ hồi
            </label>
          </div>

          {/* Điểm đi và điểm đến */}
          <div className={styles.formRow}>
            <div className={styles.selectContainer}>
              <label className={styles.label}>Điểm khởi hành:</label>
              <select
                value={departure_airport}
                onChange={(e) => setDeparture_airport(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">-- Chọn sân bay --</option>
                {airport_names.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.label}>Điểm đến:</label>
              <select
                value={arrival_airport}
                onChange={(e) => setArrival_airport(e.target.value)}
                required
                className={styles.select}
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
          </div>

          {/* Ngày đi và ngày về */}
          <div className={styles.dateRow}>
            <div className={styles.dateContainer}>
              <label className={styles.label}>Ngày đi:</label>
              <input
                type="date"
                value={departure_time}
                onChange={(e) => setDeparture_time(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            {tripType === "round-trip" && (
              <div className={styles.dateContainer}>
                <label className={styles.label}>Ngày về:</label>
                <input
                  type="date"
                  value={arrival_time}
                  onChange={(e) => setArrival_time(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
            )}
          </div>

          {/* Số hành khách */}
          <div className={styles.passengerContainer}>
            <label className={styles.label}>Hành khách:</label>
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              required
              className={styles.input}
            />
          </div>

          {/* Nút tìm chuyến bay */}
          <div>
            <button type="submit" className={styles.submitButton}>
              Tìm chuyến bay
            </button>
          </div>
        </form>
      </div>

      {/* FlightList nằm riêng ngoài khung đặt vé */}
      <div className={styles.flightSchedule}>
        <FlightList
          flights={showMatchingFlights ? matchingFlight : flights}
          onFlightClick={setSelectedFlight}
        />

        {/* Modal for FlightDetail */}
        {selectedFlight && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedFlight(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedFlight(null)}
              >
                ×
              </button>
              <FlightDetail flight={selectedFlight} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
