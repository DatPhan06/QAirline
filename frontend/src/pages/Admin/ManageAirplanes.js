import React, { useState, useEffect } from "react";
import {
  createAirplane,
  getAirplanes,
  updateAirplane,
} from "../../services/airplaneService";
import AdminSidebar from "../../components/AdminSidebar";
import AirplaneList from "../../components/AirplaneList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageAirplanes.module.css";

/**
 * ManageAirplanes component for managing the list of airplanes.
 *
 * This component allows the user to:
 * - View a list of airplanes
 * - Add a new airplane
 * - Edit an existing airplane
 * - View a guide on how to use the page
 *
 * @component
 * @example
 * return (
 *   <ManageAirplanes />
 * )
 *
 * @returns {JSX.Element} The ManageAirplanes component.
 *
 * @function
 * @name ManageAirplanes
 *
 * @property {Object} airplaneData - The state object containing airplane details.
 * @property {string} airplaneData.model - The model of the airplane.
 * @property {string} airplaneData.manufacturer - The manufacturer of the airplane.
 * @property {string} airplaneData.seat_capacity - The seat capacity of the airplane.
 * @property {string} airplaneData.range_km - The range of the airplane in kilometers.
 * @property {string} airplaneData.year_of_manufacture - The year the airplane was manufactured.
 * @property {string} airplaneData.maintenance_status - The maintenance status of the airplane.
 * @property {string} airplaneData.status - The status of the airplane.
 *
 * @property {Array} airplanes - The state array containing the list of airplanes.
 *
 * @property {boolean} isModalOpen - The state boolean indicating if the modal is open.
 * @property {boolean} isGuideOpen - The state boolean indicating if the guide is open.
 *
 * @property {Object|null} selectedAirplane - The state object containing the selected airplane details or null if no airplane is selected.
 *
 * @function handleInputChange
 * @description Handles input changes in the form and updates the airplaneData state.
 * @param {Object} e - The event object.
 *
 * @function handleFormSubmit
 * @description Handles form submission for adding or updating an airplane.
 * @param {Object} e - The event object.
 *
 * @function handleAirplaneClick
 * @description Handles the click event on an airplane to edit its details.
 * @param {Object} airplane - The airplane object that was clicked.
 *
 * @function handleAddNewAirplane
 * @description Handles the event to add a new airplane.
 *
 * @function handleCloseModal
 * @description Handles the event to close the modal.
 *
 * @function toggleGuide
 * @description Toggles the visibility of the guide.
 */
const ManageAirplanes = () => {
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [airplaneData, setAirplaneData] = useState({
    model: "",
    manufacturer: "",
    seat_capacity: "",
    range_km: "",
    year_of_manufacture: "",
    maintenance_status: "",
    status: "",
  });
  const [airplanes, setAirplanes] = useState([]);

  useEffect(() => {
    const fetchAirplanes = async () => {
      try {
        const response = await getAirplanes();
        setAirplanes(response);
      } catch (error) {
        console.error("Error fetching airplanes:", error);
      }
    };

    fetchAirplanes();
  }, []);

  const handleInputChange = (e) => {
    setAirplaneData({ ...airplaneData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAirplane) {
        await updateAirplane(selectedAirplane.airplane_id, airplaneData);
        alert("Máy bay đã được cập nhật thành công!");
      } else {
        const newAirplane = await createAirplane(airplaneData);
        alert("Máy bay mới đã được thêm thành công!");
      }
      setIsModalOpen(false);
      // Cập nhật lại danh sách máy bay
      const updatedAirplanes = await getAirplanes();
      setAirplanes(updatedAirplanes);
    } catch (error) {
      console.error("Error submitting airplane data:", error);
      alert("Cập nhật máy bay thất bại. Vui lòng thử lại.");
    }
  };

  const handleAirplaneClick = (airplane) => {
    setSelectedAirplane(airplane);
    setAirplaneData({
      model: airplane.model,
      manufacturer: airplane.manufacturer,
      seat_capacity: airplane.seat_capacity,
      range_km: airplane.range_km,
      year_of_manufacture: airplane.year_of_manufacture,
      maintenance_status: airplane.maintenance_status,
      status: airplane.status,
    });
    setIsModalOpen(true);
  };

  const handleAddNewAirplane = () => {
    setSelectedAirplane(null);
    setAirplaneData({
      model: "",
      manufacturer: "",
      seat_capacity: "",
      range_km: "",
      year_of_manufacture: "",
      maintenance_status: "",
      status: "",
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
          Quản lý máy bay{" "}
          <button className={styles.guideButton} onClick={toggleGuide}>
            {" "}
            <FontAwesomeIcon icon={faQuestionCircle} />{" "}
          </button>
        </h1>

        <button className={styles.addButton} onClick={handleAddNewAirplane}>
          Thêm máy bay mới
        </button>

        <div className={styles.listContainer}>
          <AirplaneList
            airplanes={airplanes}
            onAirplaneClick={handleAirplaneClick}
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
              {selectedAirplane ? "Chỉnh sửa máy bay" : "Thêm máy bay mới"}
            </h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Model:</label>
                <input
                  type="text"
                  name="model"
                  value={airplaneData.model}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nhà sản xuất:</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={airplaneData.manufacturer}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Sức chứa ghế:</label>
                <input
                  type="number"
                  name="seat_capacity"
                  value={airplaneData.seat_capacity}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tầm bay (km):</label>
                <input
                  type="number"
                  name="range_km"
                  value={airplaneData.range_km}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Năm sản xuất:</label>
                <input
                  type="number"
                  name="year_of_manufacture"
                  value={airplaneData.year_of_manufacture}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tình trạng bảo trì:</label>
                <input
                  type="text"
                  name="maintenance_status"
                  value={airplaneData.maintenance_status}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Trạng thái:</label>
                <input
                  type="text"
                  name="status"
                  value={airplaneData.status}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                {selectedAirplane ? "Lưu thay đổi" : "Thêm máy bay"}
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
                Trên trang này, bạn có thể quản lý danh sách máy bay. Bạn có thể
                thêm máy bay mới, chỉnh sửa thông tin máy bay hiện có, và xem
                danh sách các máy bay.
              </p>
              <ul>
                <li>
                  <strong>Thêm máy bay mới:</strong> Nhấn vào nút "Thêm máy bay
                  mới" và điền thông tin vào biểu mẫu. Sau đó nhấn "Thêm máy
                  bay".
                </li>
                <li>
                  <strong>Chỉnh sửa máy bay:</strong> Nhấn vào một máy bay trong
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

export default ManageAirplanes;
