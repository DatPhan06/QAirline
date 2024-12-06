import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlightSearch.module.css";
import { getAirports } from "../services/airportService"; // Import service
import { getFlights } from "../services/flightService"; // Add this import
import FlightList from "./FlightList"; // Import FlightList component

const FlightSearch = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [airports, setAirports] = useState([]); // State lưu danh sách sân bay
  const [flights, setFlights] = useState([]); // Add this state
  const [selectedFlight, setSelectedFlight] = useState(null); // Add this state

  const navigate = useNavigate();

  // Lấy danh sách sân bay từ backend
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const [airportsData, flightsData] = await Promise.all([
          getAirports(),
          getFlights(),
        ]);
        setAirports(airportsData);
        setFlights(flightsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sân bay:", error);
      }
    };
    fetchAirports();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!departure || !arrival || !date) {
      alert("Vui lòng điền đầy đủ thông tin tìm kiếm");
      return;
    }

    // Filter flights based on search criteria
    const filteredFlights = flights.filter(
      (flight) =>
        flight.departure_airport.city === departure &&
        flight.arrival_airport.city === arrival &&
        flight.departure_time.split("T")[0] === date
    );

    setFlights(filteredFlights);

    if (filteredFlights.length === 0) {
      alert("Không tìm thấy chuyến bay phù hợp.");
    }
  };

  // Add new function to handle flight selection
  const handleFlightSelect = (selectedFlight) => {
    navigate("/booking/book-ticket", {
      state: {
        flight: selectedFlight,
      },
    });
  };

  return (
    <div className={styles["frame-38"]}>
      <div className={styles["line-4"]}></div>
      <div className={styles["frame-2608739"]}>
        <div className={styles["frame-2608738"]}>
          <div className={styles["frame-2608721"]}>
            <img
              className={styles["airplane"]}
              src="/images/airicon.png"
              alt="Airplane"
            />
            <div className={styles["chuy-n-bay"]}>Chuyến bay</div>
          </div>
          <div className={styles["line-1"]}></div>
          <br></br>
          <br></br>
          <br></br>
        </div>
        {/* <form onSubmit={handleSearch} className={styles["frame-40"]}> */}
        <div className={styles["frame-40"]}>
          <div className={styles["text-field"]}>
            <div className={styles["text-field2"]}>
              <div className={styles["state-layer"]}>
                <div className={styles["content"]}>
                  <div className={styles["input-text"]}>
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className={styles["input-text2"]}
                    >
                      <option value="">Chọn điểm đi</option>
                      {airports.map((airport) => (
                        <option key={airport.airport_id} value={airport.city}>
                          {airport.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles["label-text"]}>
                    <div className={styles["label-text2"]}>Điểm đi</div>
                  </div>
                </div>
                <div className={styles["trailing-icon"]}></div>
              </div>
            </div>
          </div>
          <div className={styles["text-field3"]}>
            <div className={styles["text-field2"]}>
              <div className={styles["state-layer"]}>
                <div className={styles["content"]}>
                  <div className={styles["input-text"]}>
                    <select
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                      className={styles["input-text2"]}
                    >
                      <option value="">Chọn điểm đến</option>
                      {airports.map((airport) => (
                        <option key={airport.airport_id} value={airport.city}>
                          {airport.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles["label-text"]}>
                    <div className={styles["label-text2"]}>Điểm đến</div>
                  </div>
                </div>
                <div className={styles["trailing-icon"]}></div>
              </div>
            </div>
          </div>
          <div className={styles["text-field4"]}>
            <div className={styles["text-field2"]}>
              <div className={styles["state-layer2"]}>
                <div className={styles["content"]}>
                  <div className={styles["input-text"]}>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={styles["input-text2"]}
                    />{" "}
                  </div>
                  <div className={styles["label-text"]}>
                    <div className={styles["label-text3"]}>Ngày bay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["text-field5"]}></div>
        </div>
        {/* </form>{" "} */}
      </div>
      <div className={styles["frame-46"]}>
        <button
          onClick={handleSearch}
          type="submit"
          className={styles["button"]}
        >
          <div className={styles["style-layer"]}>
            <img
              className={styles["paper-plane"]}
              src="/images/cursor.png"
              alt="Paper Plane"
            />
            <div className={styles["button2"]}>Tìm chuyến bay</div>
          </div>
        </button>
      </div>
      <FlightList flights={flights} onFlightClick={handleFlightSelect} />
    </div>
  );
};

export default FlightSearch;
