import React, { useState } from "react";
import styles from './PaymentGuide.module.css'; // Import the CSS module

const PaymentGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState('onlineBooking');

  const handleButtonClick = (guide) => {
    setSelectedGuide(guide);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trang Hướng Dẫn Thanh Toán</h1>
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
          <button 
            className={`${styles.button} ${selectedGuide === 'refundPolicy' ? styles.active : ''}`} 
            onClick={() => handleButtonClick('refundPolicy')}>
            Chính sách hoàn tiền
          </button>
        </div>

        {/* Right Section: Content Area */}
        <div className={styles.frame}>
          {selectedGuide === 'onlineBooking' && (
            <div>
              <h2>Hướng Dẫn Đặt Vé Trực Tuyến</h2>
              <p>Để mua vé trực tuyến, bạn có thể làm theo các bước dưới đây:</p>
              <ul>
                <li>Truy cập vào website hoặc ứng dụng của chúng tôi.</li>
                <li>Chọn loại vé và thời gian phù hợp với nhu cầu của bạn.</li>
                <li>Điền thông tin cá nhân và chọn phương thức thanh toán.</li>
                <li>Hoàn tất giao dịch và nhận vé qua email hoặc ứng dụng.</li>
              </ul>
            </div>
          )}
          {selectedGuide === 'cancelBooking' && (
            <div>
              <h2>Hướng Dẫn Hủy Vé</h2>
              <p>Để hủy vé, làm theo các bước sau:</p>
              <ul>
                <li>Đăng nhập vào tài khoản của bạn trên website.</li>
                <li>Chọn vé muốn hủy và nhấn vào tùy chọn "Hủy vé".</li>
                <li>Xác nhận lại thông tin và hoàn tất quá trình hủy vé.</li>
              </ul>
            </div>
          )}
          {selectedGuide === 'paymentMethod' && (
            <div>
              <h2>Hướng Dẫn Thanh Toán</h2>
              <p>Có nhiều phương thức thanh toán để bạn lựa chọn:</p>
              <ul>
                <li>Thanh toán qua thẻ tín dụng hoặc thẻ ghi nợ.</li>
                <li>Thanh toán qua ví điện tử như MoMo, ZaloPay.</li>
                <li>Chuyển khoản ngân hàng trực tuyến.</li>
              </ul>
            </div>
          )}
          {selectedGuide === 'refundPolicy' && (
            <div>
              <h2>Chính Sách Hoàn Tiền</h2>
              <p>Chúng tôi cam kết hoàn tiền theo các điều kiện sau:</p>
              <ul>
                <li>Hoàn tiền trong vòng 7 ngày đối với vé chưa sử dụng.</li>
                <li>Vé đã sử dụng không thể hoàn tiền, trừ trường hợp có sự cố từ nhà cung cấp dịch vụ.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGuide;
