import React, { useState } from "react";
import styles from './PaymentGuide.module.css'; // Import the CSS module

const PaymentGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState('onlineBooking');

  const handleButtonClick = (guide) => {
    setSelectedGuide(guide);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Section: Button Area */}
        <div className={styles.buttons}>
          <button 
            className={`${styles.button} ${selectedGuide === 'onlineBooking' ? styles.active : ''}`} 
            onClick={() => handleButtonClick('onlineBooking')}>
            Hướng dẫn đặt vé trực tuyến
          </button>
          <button 
            className={`${styles.button} ${selectedGuide === 'cancelBooking' ? styles.active : ''}`} 
            onClick={() => handleButtonClick('cancelBooking')}>
            Hướng dẫn hủy vé
          </button>
          <button 
            className={`${styles.button} ${selectedGuide === 'paymentMethod' ? styles.active : ''}`} 
            onClick={() => handleButtonClick('paymentMethod')}>
            Hướng dẫn thanh toán
          </button>
        </div>

        {/* Right Section: Content Area */}
        <div className={styles.frame}>
          {selectedGuide === 'onlineBooking' && (
            <div>
              <h2>Hướng Dẫn Đặt Vé Trực Tuyến</h2>
              <p>Để mua vé trực tuyến, bạn có thể làm theo các bước dưới đây:</p>
              <ol>
                <li>Truy cập website của hãng hàng không QAirline, lựa chọn tab <strong> Đặt vé. </strong> Quý khách vui lòng lựa chọn Điểm đi, Điểm đến, Loại vé (một chiều, khứ hồi hay Đa chặng), Ngày khởi hành, Ngày trở về, Số lượng hành Khách: người lớn, trẻ em (nếu có). Sau đó chọn “Tìm chuyến bay” và chọn giờ bay phù hợp.</li>
                <li>Lựa chọn hạng vé thích hợp cho chiều đi, và chiều về, bằng cách nhấp chuột vào ô lựa chọn. Chúng tôi sẽ hiển thị bản đồ máy bay theo từng khoang hạng vé Economy, hoặc Business để quý khách lựa chọn. 
                  Tại mỗi hạng vé, quý khách sẽ nhận được tương ứng các dịch vụ ưu đãi theo chế độ của chúng tôi. Vui lòng lưu ý các thông tin quan trọng bao gồm: điều kiện thay đổi thời gian, hành trình bay, điều kiện Hoàn, huỷ.</li>
                <li>Quý khách vui lòng điền đầy đủ thông tin và thực hiện hình thức thanh toán trực tiếp. Chi tiết về thanh toán sẽ được chúng tôi giới thiệu trong mục Hướng dẫn thanh toán dưới đây.</li>
                <li>Sau khi khách hoàn thành thanh toán, hệ thống đặt chỗ cho khách và chuyển sang màn hình Xác nhận đặt chỗ. </li>
                <li>Quý khách sẽ nhận được email xác nhận đặt vé thành công đến hòm thư email đã đăng ký. Vui lòng kiểm tra lại thông tin trên vé bao gồm: Thông tin hành khách, lịch trình, dịch vụ bổ sung và chi tiết thanh toán.
                  Nếu sau 01 giờ sau khi thanh toán thành công, nếu vẫn chưa nhận được vé điện tử, vui lòng truy cập mục "Quản lý vé" tại website của QAirline, hoặc liên hệ trực tiếp tổng đài qua số điện thoại +84 1900 1900 để nhận được hỗ trợ tốt nhất.</li>
              </ol>
            </div>
          )}
          {selectedGuide === 'cancelBooking' && (
            <div>
              <h2>Hướng Dẫn Hủy Vé</h2>
              <p>Để hủy vé, làm theo các bước sau:</p>
              <ol>
                <li> <strong> Quy định hủy vé: </strong> Theo quy định của QAirline, quý khách được phép thực hiện hủy vé trong vòng 01 ngày từ thời điểm đặt vé. Việc hủy vé phải được thực hiện ít nhất 7 ngày trước ngày khởi hành</li>
                <li><strong> Phí hủy vé: </strong> Nếu quý khách hàng hủy vé trong thời gian quy định, QAirline không áp dụng phí hủy vé. Sau thời gian quy định, chúng tôi không hỗ trợ việc hủy vé và hoàn tiền cho quý khách hàng.</li>
                <li><strong> Phương thức hoàn tiền: </strong> Hoàn tiền sẽ Hoàn tiền sẽ được chuyển qua hình thức thanh toán ban đầu (thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử). Quý khách hàng lưu ý, thời gian xử lý hoàn tiền: 3–7 ngày làm việc tùy thuộc vào ngân hàng hoặc đơn vị thanh toán. </li>
                <li> <strong> Các bước hủy vé: </strong> Để hủy vé đối với các chuyến bay của QAirline, quý khách hàng vui lòng truy cập trang website chính thức của QAirline, thực hiện đăng nhập tài khoản mua hàng, lựa chọn mục Quản lý vé và chọn vé cần hủy. Quý khách hàng lưu ý kiểm tra kỹ điều kiện hủy vé theo đúng quy định của chúng tôi. Cuối cùng, quý khách vui lòng lựa chọn xác nhận hủy vé, quý khách sẽ nhận được thông báo xác nhận hủy vé. Quý khách hàng có thể theo dõi trạng thái các vé của mình tại mục quản lý vé trên tài khoản cá nhân tại trang webstie của chúng tôi.</li>
              </ol>
            </div>
          )}
          {selectedGuide === 'paymentMethod' && (
            <div>
              <h2>Hướng Dẫn Thanh Toán</h2>
              <p> Quý khách vui lòng lưu ý các bước thanh toán trực tuyến khi mua vé điện tử tại hãng hàng không QAirline như sau: </p>
              <ol>
                <li> Sau khi chọn chuyến bay phù hợp trên trang web hoặc ứng dụng QAirline, quý khách sẽ được chuyển đến trang Xác nhận thông tin vé. Tại đây, quý khách vui lòng kiểm tra đầy đủ các thông tin quan trọng. Khi mọi thông tin đã chính xác, vui lòng nhấn nút tiếp tục đến thanh toán.</li>
                <li>Tại mục thanh toán, quý khách vui lòng điền đầy đủ thông tin thanh toán của mình và thực hiện thanh toán. Chúng tôi hỗ trợ các hình thức thanh toán khả dụng bao gồm Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), Ví điện tử (MoMo, ZaloPay, PayPal).
                  <br></br>  Đối với quý khách sử dụng thẻ ghi nợ, vui lòng Nhập Tên chủ thẻ, Số thẻ, Ngày hết hạn, và Mã CVV (3 số ở mặt sau thẻ). 
                   Đối với dùng ví điện tử, quý khách quét mã QR hoặc đăng nhập tài khoản ví điện tử để xác nhận thanh toán.</li>
                <li>Sau khi điền thông tin thanh toán, nhấn vào nút Thanh toán ngay. Hệ thống sẽ xử lý giao dịch trong vài giây. Trong thời gian này, không đóng trang web hoặc ứng dụng để tránh lỗi thanh toán.</li>
                <li> Sau khi thanh toán thành công, quý khách vui lòng truy cập vào mục Quản lý vé trên trang web hoặc ứng dụng QAirline. Nếu có bất kỳ vấn đề nào liên quan đến thanh toán hoặc trạng thái vé, vui lòng liên hệ bộ phận hỗ trợ qua tổng đài: 1900 123 456.</li>
              </ol>
            </div>
          )}
      
        </div>
      </div>
    </div>
  );
};

export default PaymentGuide;
