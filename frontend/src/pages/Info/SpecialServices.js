import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialServices.module.css";

const SpecialServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = {
    seatSelection: {
      title: "Dịch Vụ Chọn Chỗ Ngồi",
      content: (
        <div className={styles.serviceContent}>
          <div className={styles.seatTypes}>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-crown"></i>
                <h4>Hạng Thương Gia</h4>
              </div>
              <div className={styles.categoryContent}>
                <div className={styles.seatImage}>
                  <img
                    src="/images/business_economy.png"
                    alt="Ghế Hạng Thương Gia"
                  />
                </div>
                <div className={styles.seatFeatures}>
                  <h5>Đặc quyền hạng ghế</h5>
                  <ul>
                    <li>
                      <i className="fas fa-bed"></i>
                      <span>Ghế ngả 180° thành giường phẳng</span>
                    </li>
                    <li>
                      <i className="fas fa-arrows-alt-h"></i>
                      <span>Không gian để chân rộng rãi (60 inches)</span>
                    </li>
                    <li>
                      <i className="fas fa-tv"></i>
                      <span>Màn hình giải trí 18 inch riêng</span>
                    </li>
                    <li>
                      <i className="fas fa-utensils"></i>
                      <span>Thực đơn cao cấp & rượu vang chọn lọc</span>
                    </li>
                    <li>
                      <i className="fas fa-suitcase"></i>
                      <span>Hành lý ký gửi 40kg</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-chair"></i>
                <h4>Hạng Phổ Thông</h4>
              </div>
              <div className={styles.categoryContent}>
                <div className={styles.seatImage}>
                  <img src="/images/standard.png" alt="Ghế Hạng Phổ Thông" />
                </div>
                <div className={styles.seatFeatures}>
                  <h5>Tiện nghi cơ bản</h5>
                  <ul>
                    <li>
                      <i className="fas fa-chair"></i>
                      <span>Ghế ngả 118° thoải mái</span>
                    </li>
                    <li>
                      <i className="fas fa-arrows-alt-h"></i>
                      <span>Khoảng cách ghế 32 inches</span>
                    </li>
                    <li>
                      <i className="fas fa-tv"></i>
                      <span>Màn hình giải trí 10.6 inch</span>
                    </li>
                    <li>
                      <i className="fas fa-utensils"></i>
                      <span>Bữa ăn tiêu chuẩn</span>
                    </li>
                    <li>
                      <i className="fas fa-suitcase"></i>
                      <span>Hành lý ký gửi 23kg</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h3>
              <i className="fas fa-gift"></i>
              Lợi ích khi đặt chỗ trước
            </h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-check-circle"></i>
                <span>Chủ động lựa chọn vị trí phù hợp</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-users"></i>
                <span>Đảm bảo ngồi cùng nhóm/gia đình</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-clock"></i>
                <span>Ưu tiên làm thủ tục tại quầy riêng</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-plane-departure"></i>
                <span>Lên máy bay theo nhóm ưu tiên</span>
              </div>
            </div>
          </div>

          <Link to="/booking/book-ticket" className={styles.bookButton}>
            <i className="fas fa-ticket-alt"></i>
            Đặt Chỗ Ngay
          </Link>
        </div>
      ),
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
      ),
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
      ),
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
      ),
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
      ),
    },
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
    <div className={styles.pagespeacial}>
      <div className={styles.container}>
        <div className={styles.servicesGrid}>
          {/* Row 1 */}
          <div
            className={`${styles.serviceFrame} ${styles.fullWidth}`}
            onClick={() => setSelectedService("seatSelection")}
          >
            <h2>{services.seatSelection.title}</h2>
          </div>

          {/* Row 2 */}
          <div
            className={styles.serviceFrame}
            onClick={() => setSelectedService("pregnantService")}
          >
            <h2>{services.pregnantService.title}</h2>
          </div>
          <div
            className={styles.serviceFrame}
            onClick={() => setSelectedService("petTransport")}
          >
            <h2>{services.petTransport.title}</h2>
          </div>

          {/* Row 3 */}
          <div
            className={styles.serviceFrame}
            onClick={() => setSelectedService("businessLounge")}
          >
            <h2>{services.businessLounge.title}</h2>
          </div>
          <div
            className={styles.serviceFrame}
            onClick={() => setSelectedService("mealPreorder")}
          >
            <h2>{services.mealPreorder.title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialServices;
