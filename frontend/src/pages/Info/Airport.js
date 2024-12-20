import React, { useState, useEffect } from 'react';
import { getAirports } from '../../services/airportService';
import styles from './Airport.module.css';

const Airport = () => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports();
        setAirports(data);
        // Chọn sân bay đầu tiên làm mặc định
        if (data.length > 0) {
          setSelectedAirport(data[0]);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin sân bay');
        setIsLoading(false);
      }
    };

    fetchAirports();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Đang tải thông tin sân bay...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.airportContainer}>
      <h1 className={styles.title}>Thông Tin Sân Bay</h1>
      
      <div className={styles.content}>
        {/* Danh sách sân bay bên trái */}
        <div className={styles.airportList}>
          <h2>Danh sách sân bay</h2>
          <ul>
            {airports.map((airport) => (
              <li 
                key={airport.airport_id}
                className={`${styles.airportItem} ${selectedAirport?.airport_id === airport.airport_id ? styles.active : ''}`}
                onClick={() => setSelectedAirport(airport)}
              >
                {airport.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Thông tin chi tiết bên phải */}
        <div className={styles.airportDetails}>
          {selectedAirport ? (
            <>
              <h2>{selectedAirport.name}</h2>
              <table className={styles.detailsTable}>
                <tbody>
                  <tr>
                    <th>Thành phố</th>
                    <td>{selectedAirport.city}</td>
                  </tr>
                  <tr>
                    <th>Quốc gia</th>
                    <td>{selectedAirport.country}</td>
                  </tr>
                  <tr>
                    <th>Mã IATA</th>
                    <td>{selectedAirport.iata_code}</td>
                  </tr>
                  <tr>
                    <th>Mã ICAO</th>
                    <td>{selectedAirport.icao_code}</td>
                  </tr>
                  <tr>
                    <th>Thông tin chung</th>
                    <td>{selectedAirport.general_info || 'Không có thông tin'}</td>
                  </tr>
                  <tr>
                    <th>Quầy thủ tục</th>
                    <td>{selectedAirport.check_in_counters || 'Không có thông tin'}</td>
                  </tr>
                  <tr>
                    <th>Dịch vụ mua sắm</th>
                    <td>{selectedAirport.shopping_services || 'Không có thông tin'}</td>
                  </tr>
                  <tr>
                    <th>Phòng chờ</th>
                    <td>{selectedAirport.lounge_services || 'Không có thông tin'}</td>
                  </tr>
                  <tr>
                    <th>Dịch vụ ăn uống</th>
                    <td>{selectedAirport.food_services || 'Không có thông tin'}</td>
                  </tr>
                  <tr>
                    <th>Dịch vụ đổi tiền</th>
                    <td>{selectedAirport.currency_exchange || 'Không có thông tin'}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <p>Vui lòng chọn một sân bay</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Airport;