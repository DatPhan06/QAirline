import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialServices.module.css";

const SpecialServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = {
    seatSelection: {
      title: "Chọn Chỗ Ngồi Yêu Thích",
      content: (
        <div className={styles.serviceContent}>
          <h2>Chọn Chỗ Ngồi Yêu Thích</h2>
          <p>Tận hưởng chuyến bay thoải mái với vị trí ghế như ý</p>
          <ul>
            <li>Ghế gần cửa sổ - Ngắm nhìn bầu trời</li>
            <li>Ghế cạnh lối đi - Dễ dàng di chuyển</li>
            <li>Hàng ghế đầu - Không gian để chân rộng rãi</li>
            <li>Ghế gần cửa thoát hiểm - Thêm không gian để chân</li>
          </ul>
          <p>Giá dịch vụ: Từ 50.000 VND - 200.000 VND tùy vị trí</p>
        </div>
      )
    },
    pregnantService: {
      title: "Dịch Vụ Thai Sản",
      content: (
        <div className={styles.serviceContent}>
          <h2>Dịch Vụ Thai Sản</h2>
          <p>Chăm sóc đặc biệt dành cho phụ nữ mang thai</p>
          <ul>
            <li>Hỗ trợ ưu tiên làm thủ tục</li>
            <li>Ghế ngồi thoải mái</li>
            <li>Hỗ trợ y tế khi cần thiết</li>
            <li>Suất ăn đặc biệt</li>
          </ul>
          <p>Vui lòng đặt trước 48 giờ</p>
        </div>
      )
    },
    petTransport: {
      title: "Vận Chuyển Thú Cưng",
      content: (
        <div className={styles.serviceContent}>
          <h2>Vận Chuyển Thú Cưng</h2>
          <p>Đồng hành cùng thú cưng thân yêu của bạn</p>
          <ul>
            <li>Vận chuyển trong khoang - Cho thú cưng dưới 8kg</li>
            <li>Vận chuyển dưới hầm hàng - Có điều hòa nhiệt độ</li>
            <li>Lồng vận chuyển theo tiêu chuẩn</li>
            <li>Chăm sóc đặc biệt trong suốt chuyến bay</li>
          </ul>
          <p>Giá: Từ 400.000 VND/thú cưng</p>
        </div>
      )
    },
    businessLounge: {
      title: "Phòng Chờ Thương Gia",
      content: (
        <div className={styles.serviceContent}>
          <h2>Phòng Chờ Thương Gia</h2>
          <p>Trải nghiệm đẳng cấp trước chuyến bay</p>
          <ul>
            <li>Đồ ăn và thức uống cao cấp</li>
            <li>Khu vực nghỉ ngơi riêng tư</li>
            <li>Wifi tốc độ cao</li>
            <li>Dịch vụ spa và massage</li>
          </ul>
          <p>Giá: 500.000 VND/người/lượt</p>
        </div>
      )
    },
    mealPreorder: {
      title: "Đặt Trước Suất Ăn",
      content: (
        <div className={styles.serviceContent}>
          <h2>Đặt Trước Suất Ăn</h2>
          <p>Lựa chọn bữa ăn theo sở thích</p>
          <ul>
            <li>Thực đơn đa dạng</li>
            <li>Suất ăn đặc biệt theo yêu cầu</li>
            <li>Đồ ăn chay</li>
            <li>Thực đơn trẻ em</li>
          </ul>
          <p>Đặt trước 24 giờ trước chuyến bay</p>
        </div>
      )
    }
  };

  if (selectedService) {
    return (
      <div className={styles.fullscreenService}>
        {services[selectedService].content}
        <button 
          className={styles.backButton}
          onClick={() => setSelectedService(null)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className ={styles.pagespeacial}> 
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Dịch Vụ Đặc Biệt</h1>
      
      <div className={styles.servicesGrid}>
        {/* Row 1 */}
        <div 
          className={`${styles.serviceFrame} ${styles.fullWidth}`}
          onClick={() => setSelectedService('seatSelection')}
        >
          <h2>{services.seatSelection.title}</h2>
        </div>

        {/* Row 2 */}
        <div 
          className={styles.serviceFrame}
          onClick={() => setSelectedService('pregnantService')}
        >
          <h2>{services.pregnantService.title}</h2>
        </div>
        <div 
          className={styles.serviceFrame}
          onClick={() => setSelectedService('petTransport')}
        >
          <h2>{services.petTransport.title}</h2>
        </div>

        {/* Row 3 */}
        <div 
          className={styles.serviceFrame}
          onClick={() => setSelectedService('businessLounge')}
        >
          <h2>{services.businessLounge.title}</h2>
        </div>
        <div 
          className={styles.serviceFrame}
          onClick={() => setSelectedService('mealPreorder')}
        >
          <h2>{services.mealPreorder.title}</h2>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SpecialServices;