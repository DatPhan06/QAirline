import React, { useState } from "react";
import styles from "./CancelTicket.module.css";

const CancelTicket = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const ticketDetails = {
    saver: [
      { criteria: "Hành lý xách tay", value: "7 kg" },
      { criteria: "Hành lý ký gửi (Người lớn/ Trẻ em)", value: "Trả phí" },
      { criteria: "Thay đổi chuyến bay (trước 03 tiếng)", value: "600.000 VNĐ + chênh lệch (nếu có)" },
      { criteria: "Hoàn vé (trước 03 tiếng)", value: "Không áp dụng" },
    ],
    hotDeal: [
      { criteria: "Hành lý xách tay", value: "7 kg" },
      { criteria: "Hành lý ký gửi (Người lớn/ Trẻ em)", value: "20 kg" },
      { criteria: "Thay đổi chuyến bay (trước 03 tiếng)", value: "600.000 VNĐ + chênh lệch (nếu có)" },
      { criteria: "Hoàn vé (trước 03 tiếng)", value: "Không áp dụng" },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Phần 1: Lợi ích khi đặt vé */}
      <section className={styles.benefits}>
        <h1>Lợi ích khi đặt vé cùng QAirline</h1>
        <ul>
          <li>Miễn phí thay đổi lịch bay một lần</li>
          <li>Giảm giá lên tới 30% cho các chuyến bay quốc tế</li>
          <li>Dịch vụ hỗ trợ khách hàng 24/7</li>
          <li>Đảm bảo chỗ ngồi ở hạng cao nhất nếu có sẵn</li>
        </ul>
      </section>

      {/* Phần 2: Lựa chọn Hạng vé */}
      <section className={styles.ticketSelectionSection}>
        <div className={styles.ticketSelection}>
          <button
            className={`${styles.ticketButton} ${selectedClass === 'saver' ? styles.active : ''}`}
            onClick={() => setSelectedClass('saver')}
          >
            Hạng ghế Thường
          </button>
          <button
            className={`${styles.ticketButton} ${selectedClass === 'hotDeal' ? styles.active : ''}`}
            onClick={() => setSelectedClass('hotDeal')}
          >
            Hạng ghế Thương gia
          </button>
        </div>

        <div className={styles.ticketDetails}>
          {selectedClass && (
            <table className={styles.ticketTable}>
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {ticketDetails[selectedClass].map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.criteria}</td>
                    <td>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Phần 3: Lưu ý */}
      <section className={styles.notes}>
        <h2>Lưu ý</h2>
        <p>
          Các thông tin về điều kiện giá vé có thể thay đổi tùy theo chính sách của hãng. Vui lòng kiểm tra
          kỹ trước khi đặt vé để đảm bảo quyền lợi tốt nhất.
        </p>
      </section>
    </div>
  );
};

export default CancelTicket;
