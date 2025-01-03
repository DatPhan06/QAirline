import React, { useState, useEffect } from "react";
import {
  createAirport,
  getAirports,
  updateAirport,
} from "../../services/airportService";
import AdminSidebar from "../../components/AdminSidebar";
import AirportList from "../../components/AirportList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageAirports.module.css";

/**
 * ManageAirports component for managing airport data.
 *
 * This component allows users to view, add, and edit airport information.
 * It includes a form for adding/editing airports and a list of existing airports.
 *
 * @component
 * @example
 * return (
 *   <ManageAirports />
 * )
 *
 * @returns {JSX.Element} The ManageAirports component.
 *
 * @function
 * @name ManageAirports
 *
 * @property {Object} airportData - The state object containing airport details.
 * @property {string} airportData.name - The name of the airport.
 * @property {string} airportData.city - The city where the airport is located.
 * @property {string} airportData.country - The country where the airport is located.
 * @property {string} airportData.iataCode - The IATA code of the airport.
 * @property {string} airportData.icaoCode - The ICAO code of the airport.
 *
 * @property {Array} airports - The state array containing the list of airports.
 *
 * @property {boolean} isModalOpen - The state boolean indicating if the modal is open.
 * @property {boolean} isGuideOpen - The state boolean indicating if the guide is open.
 *
 * @property {Object|null} selectedAirport - The state object containing the selected airport details for editing.
 *
 * @function handleInputChange
 * @description Handles input changes in the form and updates the airportData state.
 * @param {Object} e - The event object.
 *
 * @function handleFormSubmit
 * @description Handles form submission for adding or editing an airport.
 * @param {Object} e - The event object.
 *
 * @function handleAirportClick
 * @description Handles the click event on an airport item to edit its details.
 * @param {Object} airport - The airport object.
 *
 * @function handleAddNewAirport
 * @description Handles the event to open the modal for adding a new airport.
 *
 * @function handleCloseModal
 * @description Handles the event to close the modal.
 *
 * @function toggleGuide
 * @description Toggles the visibility of the guide.
 */
const ManageAirports = () => {
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [airportData, setAirportData] = useState({
    name: "",
    city: "",
    country: "",
    iataCode: "",
    icaoCode: "",
  });
  const [airports, setAirports] = useState([]);

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

  const handleInputChange = (e) => {
    setAirportData({ ...airportData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate input data
      if (
        !airportData.name ||
        !airportData.city ||
        !airportData.country ||
        !airportData.iataCode ||
        !airportData.icaoCode
      ) {
        alert("Vui lòng điền đầy đủ thông tin sân bay");
        return;
      }

      // Validate IATA code format (3 letters)
      if (!/^[A-Z]{3}$/.test(airportData.iataCode.toUpperCase())) {
        alert("Mã IATA phải có đúng 3 ký tự chữ");
        return;
      }

      // Validate ICAO code format (4 letters)
      if (!/^[A-Z]{4}$/.test(airportData.icaoCode.toUpperCase())) {
        alert("Mã ICAO phải có đúng 4 ký tự chữ");
        return;
      }

      const formattedData = {
        ...airportData,
        iata_code: airportData.iataCode.toUpperCase(),
        icao_code: airportData.icaoCode.toUpperCase(),
      };

      if (selectedAirport) {
        // Update existing airport
        await updateAirport(selectedAirport.airport_id, formattedData);
        alert("Sân bay đã được cập nhật thành công!");
      } else {
        // Create new airport
        await createAirport(formattedData);
        alert("Sân bay mới đã được thêm thành công!");
      }

      // Close modal and refresh airport list
      setIsModalOpen(false);
      const updatedAirports = await getAirports();
      setAirports(updatedAirports);

      // Reset form data
      setAirportData({
        name: "",
        city: "",
        country: "",
        iataCode: "",
        icaoCode: "",
      });
      setSelectedAirport(null);
    } catch (error) {
      console.error("Error submitting airport data:", error);
      if (error.response?.data?.detail) {
        alert(`Lỗi: ${error.response.data.detail}`);
      } else {
        alert("Cập nhật sân bay thất bại. Vui lòng thử lại.");
      }
    }
  };

  const handleAirportClick = (airport) => {
    setSelectedAirport(airport);
    setAirportData({
      name: airport.name,
      city: airport.city,
      country: airport.country,
      iataCode: airport.iata_code,
      icaoCode: airport.icao_code,
    });
    setIsModalOpen(true);
  };

  const handleAddNewAirport = () => {
    setSelectedAirport(null);
    setAirportData({
      name: "",
      city: "",
      country: "",
      iataCode: "",
      icaoCode: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (window.confirm("Bạn có muốn thoát chỉnh sửa?")) {
      setIsModalOpen(false);
    }
  };

  const toggleGuide = () => {
    setIsGuideOpen(!isGuideOpen);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>
          Quản lý sân bay{" "}
          <button className={styles.guideButton} onClick={toggleGuide}>
            {" "}
            <FontAwesomeIcon icon={faQuestionCircle} />{" "}
          </button>
        </h1>

        <button className={styles.addButton} onClick={handleAddNewAirport}>
          Thêm sân bay mới
        </button>

        <div className={styles.listContainer}>
          <AirportList
            airports={airports}
            onAirportClick={handleAirportClick}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <h2>
              {selectedAirport ? "Chỉnh sửa sân bay" : "Thêm sân bay mới"}
            </h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={airportData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Thành phố:</label>
                <input
                  type="text"
                  name="city"
                  value={airportData.city}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Quốc gia:</label>
                <input
                  type="text"
                  name="country"
                  value={airportData.country}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã IATA:</label>
                <input
                  type="text"
                  name="iataCode"
                  value={airportData.iataCode}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã ICAO:</label>
                <input
                  type="text"
                  name="icaoCode"
                  value={airportData.icaoCode}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                {selectedAirport ? "Lưu thay đổi" : "Thêm sân bay"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isGuideOpen && (
        <div className={styles.modalOverlay} onClick={toggleGuide}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={toggleGuide}>
              ×
            </button>
            <div className={styles.guide}>
              <h2>Hướng dẫn sử dụng trang</h2>
              <p>
                Trên trang này, bạn có thể quản lý danh sách sân bay. Bạn có thể
                thêm sân bay mới, chỉnh sửa thông tin sân bay hiện có, và xem
                danh sách các sân bay.
              </p>
              <ul>
                <li>
                  <strong>Thêm sân bay mới:</strong> Nhấn vào nút "Thêm sân bay
                  mới" và điền thông tin vào biểu mẫu. Sau đó nhấn "Thêm sân
                  bay".
                </li>
                <li>
                  <strong>Chỉnh sửa sân bay:</strong> Nhấn vào một sân bay trong
                  danh sách để chỉnh sửa thông tin. Sau khi chỉnh sửa, nhấn "Lưu
                  thay đổi".
                </li>
                <li>
                  <strong>Đóng biểu mẫu:</strong> Nhấn vào nút "×" hoặc nhấn ra
                  ngoài biểu mẫu để đóng biểu mẫu.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAirports;
