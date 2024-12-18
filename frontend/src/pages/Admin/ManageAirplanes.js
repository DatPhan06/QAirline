import React, { useState, useEffect } from "react";
import {
  createAirplane,
  getAirplanes,
  updateAirplane,
} from "../../services/airplaneService";
import AdminSidebar from "../../components/AdminSidebar";
import AirplaneList from "../../components/AirplaneList";
import styles from "./ManageAirplanes.module.css";

const ManageAirplanes = () => {
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>Quản lý máy bay</h1>
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
    </div>
  );
};

export default ManageAirplanes;
