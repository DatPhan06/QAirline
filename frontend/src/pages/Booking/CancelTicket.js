import React, { useState } from "react";
import styles from "./CancelTicket.module.css";

const CancelTicket = () => {
  const [selectedClass, setSelectedClass] = useState('saver');

  const ticketDetails = {
    saver: [
      { 
        criteria: "Hành lý xách tay", 
        value: "Được mang theo tối đa 7 kg, gồm 1 túi xách lớn và 1 túi nhỏ (ví dụ: túi laptop hoặc túi cá nhân). Kích thước hành lý không vượt quá 56 x 36 x 23 cm." 
      },
      { 
        criteria: "Hành lý ký gửi (Người lớn/ Trẻ em)", 
        value: "Không bao gồm trong giá vé. Hành khách có thể mua thêm gói hành lý ký gửi với giá từ 120.000 VNĐ cho mỗi 10 kg, áp dụng tùy theo chặng bay." 
      },
      { 
        criteria: "Thay đổi chuyến bay (trước 03 tiếng)", 
        value: "Phí thay đổi là 600.000 VNĐ mỗi vé, cộng thêm chênh lệch giá vé (nếu có). Không áp dụng thay đổi nếu thời gian khởi hành còn dưới 03 tiếng." 
      },
      { 
        criteria: "Hoàn vé (trước 03 tiếng)", 
        value: "Không áp dụng hoàn vé trong mọi trường hợp. Giá vé sẽ không được hoàn lại nếu hành khách không sử dụng vé." 
      },
      { 
        criteria: "Chọn chỗ ngồi", 
        value: "Hành khách có thể chọn chỗ ngồi trước với mức phí từ 50.000 VNĐ đến 200.000 VNĐ, tùy thuộc vào vị trí ghế (cửa sổ, lối đi, hàng đầu)." 
      },
      { 
        criteria: "Ưu tiên làm thủ tục", 
        value: "Không bao gồm. Hành khách sẽ xếp hàng theo thứ tự thông thường tại quầy làm thủ tục và cửa lên máy bay." 
      },
      { 
        criteria: "Suất ăn trên chuyến bay", 
        value: "Không bao gồm trong giá vé. Hành khách có thể mua các suất ăn nhẹ hoặc nước uống trên chuyến bay với giá từ 30.000 VNĐ đến 150.000 VNĐ." 
      },
      { 
        criteria: "Thời gian hoàn tất thủ tục (check-in)", 
        value: "Hành khách cần hoàn tất thủ tục ít nhất 90 phút trước giờ khởi hành. Check-in trực tuyến mở trước 24 giờ và đóng 4 giờ trước chuyến bay." 
      },
      { 
        criteria: "Ghi chú đặc biệt", 
        value: "Vé tiết kiệm dành cho hành khách muốn tối ưu chi phí, không áp dụng các quyền lợi như hoàn vé hoặc ưu tiên dịch vụ." 
      },
    ],
    
    hotDeal: [
      { 
        criteria: "Hành lý xách tay", 
        value: "Được mang theo tối đa 7 kg, bao gồm 1 túi xách lớn và 1 túi nhỏ. Hành lý được ưu tiên kiểm tra tại quầy thủ tục. Kích thước không vượt quá 56 x 36 x 23 cm." 
      },
      { 
        criteria: "Hành lý ký gửi (Người lớn/ Trẻ em)", 
        value: "Bao gồm 20 kg hành lý ký gửi miễn phí. Hành khách có thể mua thêm hành lý ký gửi với mức phí ưu đãi (80.000 VNĐ cho mỗi 10 kg)." 
      },
      { 
        criteria: "Thay đổi chuyến bay (trước 03 tiếng)", 
        value: "Phí thay đổi là 600.000 VNĐ mỗi vé, cộng thêm chênh lệch giá vé (nếu có). Thời gian thay đổi áp dụng tối đa trước 03 tiếng so với giờ khởi hành." 
      },
      { 
        criteria: "Hoàn vé (trước 03 tiếng)", 
        value: "Không áp dụng hoàn vé trong mọi trường hợp, trừ khi chuyến bay bị hủy do lý do của hãng." 
      },
      { 
        criteria: "Chọn chỗ ngồi", 
        value: "Miễn phí chọn chỗ ngồi tiêu chuẩn (ghế gần lối đi hoặc cửa sổ). Các ghế hàng đầu hoặc thêm không gian để chân sẽ có mức phí từ 100.000 VNĐ." 
      },
      { 
        criteria: "Ưu tiên làm thủ tục", 
        value: "Bao gồm trong vé. Hành khách sẽ có lối đi ưu tiên tại quầy làm thủ tục và cửa lên máy bay." 
      },
      { 
        criteria: "Suất ăn trên chuyến bay", 
        value: "Bao gồm 1 suất ăn nhẹ và 1 phần nước uống miễn phí (nước suối, trà hoặc cà phê). Hành khách có thể nâng cấp suất ăn với mức phí từ 50.000 VNĐ." 
      },
      { 
        criteria: "Thời gian hoàn tất thủ tục (check-in)", 
        value: "Check-in trực tuyến mở trước 24 giờ và đóng 2 giờ trước chuyến bay. Quầy thủ tục ưu tiên mở ít nhất 120 phút trước giờ khởi hành." 
      },
      { 
        criteria: "Ghi chú đặc biệt", 
        value: "Vé phù hợp cho hành khách cần thêm quyền lợi như hành lý ký gửi miễn phí và ưu tiên dịch vụ. Không áp dụng các chính sách hoàn vé hoặc thay đổi đặc biệt." 
      },
    ],    
  };

  return (
    <div className = {styles.pageIf}> 
    <div className={styles.container}>
      {/* Phần 1: Lựa chọn Hạng vé */}
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

      {/* Phần 2: Lưu ý */}
      <section className={styles.notes}>
        <h2>Lưu ý</h2>
        <p>
          Các thông tin về điều kiện giá vé có thể thay đổi tùy theo chính sách của hãng. Vui lòng kiểm tra
          kỹ trước khi đặt vé để đảm bảo quyền lợi tốt nhất.
        </p>
        <p> Tất cả các phí trên đã bao gồm VAT (ngoại trừ giá vé của em bé dưới 2 tuổi). </p>
        <p>Phí hoàn vé, phí thay đổi chuyến bay/ hành trình, phí đảo trật tự họ tên áp dụng theo đầu vé (phí/ 1 người/1 lần đổi)</p>
      </section>
    </div>
    </div>
  );
};

export default CancelTicket;
