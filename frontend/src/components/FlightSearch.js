import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlightSearch.module.css";
import { getAirports } from "../services/airportService";
import { getFlights } from "../services/flightService";
// FlightList không được sử dụng trong FlightSearch nên có thể loại bỏ nếu không cần

const FlightSearch = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]); // Thêm dòng này

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airportsData, flightsData] = await Promise.all([
          getAirports(),
          getFlights(),
        ]);
        setAirports(airportsData);
        setFlights(flightsData); // Đảm bảo setFlights được gọi đúng
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Validate required fields
    if (
      !departure ||
      !arrival ||
      !date ||
      (tripType === "round-trip" && !returnDate)
    ) {
      alert("Vui lòng điền đầy đủ thông tin tìm kiếm");
      return;
    }

    // Navigate to BookTicket with search params
    navigate("/booking/book-ticket", {
      state: {
        searchParams: {
          departure,
          arrival,
          tripType,
          departureDate: date,
          returnDate,
          passengers,
        },
      },
    });
  };

  return (
    <div className={styles.flightSearchContainer}>
      <h2 className={styles.title}>Tìm kiếm Chuyến Bay</h2>
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
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
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
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
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
  );
};

export default FlightSearch;
