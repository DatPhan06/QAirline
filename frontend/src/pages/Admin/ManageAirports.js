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
      if (selectedAirport) {
        await updateAirport(selectedAirport.airport_id, airportData);
        alert("Sân bay đã được cập nhật thành công!");
      } else {
        const newAirport = await createAirport(airportData);
        alert("Sân bay mới đã được thêm thành công!");
      }
      setIsModalOpen(false);
      const updatedAirports = await getAirports();
      setAirports(updatedAirports);
    } catch (error) {
      console.error("Error submitting airport data:", error);
      alert("Cập nhật sân bay thất bại. Vui lòng thử lại.");
    }
  };

  const handleAirportClick = (airport) => {
    setSelectedAirport(airport);
    setAirportData({
      name: airport.name,
      city: airport.city,
      country: airport.country,
      iataCode: airport.iataCode,
      icaoCode: airport.icaoCode,
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
