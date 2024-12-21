import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAirplaneById,
  updateAirplane,
} from "../../services/airplaneService";
import { getSeatsByAirplaneId, updateSeat } from "../../services/seatService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./EditAirplane.module.css";

/**
 * EditAirplane component allows admin users to edit airplane details and seat statuses.
 *
 * @component
 * @returns {JSX.Element} The EditAirplane component.
 *
 * @example
 * // Usage example:
 * // <EditAirplane />
 *
 * @description
 * This component fetches airplane data and seat information based on the airplane ID from the URL parameters.
 * It provides a form for editing airplane details such as model, manufacturer, seat capacity, range, year of manufacture,
 * maintenance status, and status. It also allows updating the status of individual seats.
 *
 * The component includes pagination and search functionality for the seat list.
 *
 * @function
 * @name EditAirplane
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @requires useParams - To get the airplane ID from the URL.
 * @requires useNavigate - To navigate to different routes.
 * @requires useState - To manage component state.
 * @requires useEffect - To fetch data when the component mounts.
 * @requires getAirplaneById - API call to fetch airplane data by ID.
 * @requires getSeatsByAirplaneId - API call to fetch seats data by airplane ID.
 * @requires updateAirplane - API call to update airplane data.
 * @requires updateSeat - API call to update seat status.
 * @requires AdminSidebar - Sidebar component for admin navigation.
 * @requires styles - CSS module for styling the component.
 */
const EditAirplane = () => {
  const { airplaneId } = useParams();
  const navigate = useNavigate();
  const [airplaneData, setAirplaneData] = useState(null);
  const [seats, setSeats] = useState([]);
  const [initialSeats, setInitialSeats] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [seatsPerPage] = useState(7); // Số ghế mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  // Lọc và phân trang danh sách ghế
  const filteredSeats = seats.filter((seat) => {
    const seatNumber = seat.seat_number.toLowerCase();
    const seatClass = seat.seat_class.toLowerCase();
    const search = searchTerm.toLowerCase();

    return seatNumber.includes(search) || seatClass.includes(search);
  });

  const indexOfLastSeat = currentPage * seatsPerPage;
  const indexOfFirstSeat = indexOfLastSeat - seatsPerPage;
  const currentSeats = filteredSeats.slice(indexOfFirstSeat, indexOfLastSeat);

  const totalPages = Math.ceil(filteredSeats.length / seatsPerPage);

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
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Tìm kiếm ghế..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
            <table className={styles.seatTable}>
              <thead>
                <tr>
                  <th>Số ghế</th>
                  <th>Loại ghế</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {currentSeats.map((seat) => (
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
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Trang trước
              </button>
              <span>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAirplane;
