import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAirplaneById,
  updateAirplane,
} from "../../services/airplaneService";
import { getSeatsByAirplaneId, updateSeat } from "../../services/seatService";
import {
  getTicketByFlightAndSeat,
  updateTicketStatus,
} from "../../services/ticketService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./EditAirplane.module.css";

const EditAirplane = () => {
  const { airplaneId } = useParams();
  const navigate = useNavigate();
  const [airplaneData, setAirplaneData] = useState(null);
  const [seats, setSeats] = useState([]);
  const [initialSeats, setInitialSeats] = useState([]);

  useEffect(() => {
    const fetchAirplaneData = async () => {
      try {
        const airplane = await getAirplaneById(airplaneId);
        setAirplaneData(airplane);
        const seatsData = await getSeatsByAirplaneId(airplaneId);
        setSeats(seatsData);
        setInitialSeats(seatsData); // Lưu trạng thái ban đầu của các ghế
      } catch (error) {
        console.error("Error fetching airplane data:", error);
      }
    };

    fetchAirplaneData();
  }, [airplaneId]);

  const handleInputChange = (e) => {
    setAirplaneData({ ...airplaneData, [e.target.name]: e.target.value });
  };

  const handleSeatStatusChange = (seatId, status) => {
    setSeats(
      seats.map((seat) =>
        seat.seat_id === seatId ? { ...seat, status } : seat
      )
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAirplane(airplaneId, airplaneData);

      // Chỉ cập nhật các ghế có trạng thái thay đổi
      const updatedSeats = seats.filter(
        (seat, index) => seat.status !== initialSeats[index].status
      );
      for (const seat of updatedSeats) {
        await updateSeat(seat.seat_id, { status: seat.status });
      }

      alert("Máy bay và trạng thái ghế đã được cập nhật thành công!");
      navigate("/admin/manage-airplanes");
    } catch (error) {
      console.error("Error updating airplane data:", error);
      alert("Cập nhật máy bay thất bại. Vui lòng thử lại.");
    }
  };

  const handleBackClick = () => {
    navigate("/admin/manage-airplanes");
  };

  if (!airplaneData) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className={styles.editAirplaneContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>Chỉnh sửa máy bay</h1>
        <div className={styles.editContainer}>
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
              Lưu thay đổi
            </button>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBackClick}
            >
              Trở về
            </button>
          </form>
          <div className={styles.seatList}>
            <h2>Trạng thái ghế ngồi</h2>
            <table className={styles.seatTable}>
              <thead>
                <tr>
                  <th>Số ghế</th>
                  <th>Loại ghế</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {seats.map((seat) => (
                  <tr key={seat.seat_id}>
                    <td>{seat.seat_number}</td>
                    <td>{seat.seat_class}</td>
                    <td>
                      <select
                        value={seat.status}
                        onChange={(e) =>
                          handleSeatStatusChange(seat.seat_id, e.target.value)
                        }
                        className={styles.select}
                      >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAirplane;
