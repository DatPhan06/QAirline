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
      searchFlights(
        departure,
        arrival,
        departureDate,
        returnDate,
        passengers,
        tripType
      );
    }
  }, [searchParams, flights]);

  const airport_names = airports.map((airport) => airport.city);

  return (
    <div className={styles.bookingContainer}>
      {/* Khung đặt vé */}
      <div className={styles.flightSearchContainer}>
        <h2 className={styles.title}>Đặt vé</h2>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          {/* Trip Type Selection */}
          <div className={styles.tripTypeContainer}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={(e) => setTripType(e.target.value)}
                className={styles.radioInput}
              />
              Một chiều
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={(e) => setTripType(e.target.value)}
                className={styles.radioInput}
              />
              Khứ hồi
            </label>
          </div>
          {/* Container cho phần "Từ" và "Đến" */}
          <div className={styles.fromToContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="departure" className={styles.label}>
                Từ
              </label>
              <select
                id="departure"
                value={departure_airport}
                onChange={(e) => setDeparture_airport(e.target.value)}
                className={styles.select}
              >
                <option value="">Chọn điểm đi</option>
                {airports.map((airport) => (
                  <option key={airport.airport_id} value={airport.city}>
                    {airport.city}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="arrival" className={styles.label}>
                Đến
              </label>
              <select
                id="arrival"
                value={arrival_airport}
                onChange={(e) => setArrival_airport(e.target.value)}
                className={styles.select}
              >
                <option value="">Chọn điểm đến</option>
                {airports.map((airport) => (
                  <option key={airport.airport_id} value={airport.city}>
                    {airport.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Container cho phần Ngày đi và Ngày về */}
          <div className={styles.dateContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>
                Ngày đi
              </label>
              <input
                type="date"
                id="date"
                value={departure_time}
                onChange={(e) => setDeparture_time(e.target.value)}
                className={styles.input}
              />
            </div>

            {tripType === "round-trip" && (
              <div className={styles.formGroup}>
                <label htmlFor="returnDate" className={styles.label}>
                  Ngày về
                </label>
                <input
                  type="date"
                  id="returnDate"
                  value={arrival_time}
                  onChange={(e) => setArrival_time(e.target.value)}
                  className={styles.input}
                />
              </div>
            )}
          </div>

          {/* Passenger Selection */}
          <div className={styles.passengerContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="passengers" className={styles.label}>
                Số hành khách
              </label>
              <input
                type="number"
                id="passengers"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" className={styles.searchButton}>
            Tìm chuyến bay
          </button>
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
