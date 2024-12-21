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
          <p>
            Chúng tôi cung cấp dịch vụ chăm sóc đặc biệt dành cho phụ nữ mang
            thai để đảm bảo một chuyến bay an toàn và thoải mái.
          </p>

          <div className={styles.serviceDescription}>
            <p>
              Dịch vụ thai sản của chúng tôi bao gồm các tiện ích và hỗ trợ đặc
              biệt để đảm bảo sự thoải mái và an toàn cho hành khách mang thai
              trong suốt chuyến bay.
            </p>
          </div>

          <div className={styles.seatTypes}>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-heartbeat"></i>
                <h4>Hỗ Trợ Y Tế</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Kiểm tra sức khỏe trước chuyến bay</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Hỗ trợ y tế trong suốt chuyến bay</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Ưu tiên xử lý trong trường hợp khẩn cấp</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-chair"></i>
                <h4>Ghế Ngồi Thoải Mái</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Ghế ngả 180° với không gian rộng rãi</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Gối và chăn mềm mại</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Vị trí gần nhà vệ sinh</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-utensils"></i>
                <h4>Suất Ăn Đặc Biệt</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn dinh dưỡng cao</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Thực đơn đa dạng và phong phú</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Đồ uống không cồn</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h3>
              <i className="fas fa-gift"></i>
              Lợi ích khi sử dụng dịch vụ thai sản
            </h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-check-circle"></i>
                <span>Chăm sóc y tế toàn diện</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-users"></i>
                <span>Đảm bảo an toàn và thoải mái</span>
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
    petTransport: {
      title: "Vận Chuyển Thú Cưng",
      content: (
        <div className={styles.serviceContent}>
          <h2>Vận Chuyển Thú Cưng</h2>
          <p>
            Đồng hành cùng thú cưng thân yêu của bạn trên mọi chuyến bay với
            dịch vụ vận chuyển thú cưng của chúng tôi.
          </p>

          <div className={styles.serviceDescription}>
            <p>
              Chúng tôi cung cấp dịch vụ vận chuyển thú cưng an toàn và thoải
              mái, đảm bảo thú cưng của bạn được chăm sóc tốt nhất trong suốt
              hành trình.
            </p>
          </div>

          <div className={styles.seatTypes}>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-paw"></i>
                <h4>Vận Chuyển Trong Khoang</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Thú cưng dưới 8kg (bao gồm lồng)</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Lồng vận chuyển theo tiêu chuẩn</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Chăm sóc đặc biệt trong suốt chuyến bay</span>
                  </li>
                  <li>
                    <i className="fas fa-tag"></i>
                    <span className={styles.price}>400.000 VND/thú cưng</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-warehouse"></i>
                <h4>Vận Chuyển Dưới Hầm Hàng</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Thú cưng trên 8kg hoặc nhiều hơn</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Khu vực có điều hòa nhiệt độ</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Lồng vận chuyển theo tiêu chuẩn</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Chăm sóc đặc biệt trong suốt chuyến bay</span>
                  </li>
                  <li>
                    <i className="fas fa-tag"></i>
                    <span className={styles.price}>600.000 VND/thú cưng</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h3>
              <i className="fas fa-gift"></i>
              Lợi ích khi sử dụng dịch vụ vận chuyển thú cưng
            </h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-heart"></i>
                <span>Chăm sóc tận tình và chu đáo</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-shield-alt"></i>
                <span>An toàn và đảm bảo</span>
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
    businessLounge: {
      title: "Phòng Chờ Thương Gia",
      content: (
        <div className={styles.serviceContent}>
          <h2>Phòng Chờ Thương Gia</h2>
          <p>
            Trải nghiệm đẳng cấp trước chuyến bay với dịch vụ phòng chờ thương
            gia của chúng tôi.
          </p>

          <div className={styles.serviceDescription}>
            <p>
              Phòng chờ thương gia của chúng tôi cung cấp không gian yên tĩnh và
              tiện nghi, giúp bạn thư giãn và chuẩn bị tốt nhất cho chuyến bay.
            </p>
          </div>

          <div className={styles.seatTypes}>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-utensils"></i>
                <h4>Đồ Ăn và Thức Uống Cao Cấp</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Buffet đa dạng với các món ăn quốc tế</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Đồ uống có cồn và không cồn</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Thực đơn đặc biệt theo yêu cầu</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-couch"></i>
                <h4>Khu Vực Nghỉ Ngơi Riêng Tư</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Ghế ngả 180° với không gian riêng tư</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Phòng tắm và tiện nghi cá nhân</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Gối và chăn mềm mại</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-wifi"></i>
                <h4>Tiện Ích Công Nghệ</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Wifi tốc độ cao miễn phí</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Khu vực làm việc với máy tính và máy in</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Ổ cắm điện và cổng sạc USB</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h3>
              <i className="fas fa-gift"></i>
              Lợi ích khi sử dụng phòng chờ thương gia
            </h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-heart"></i>
                <span>Không gian yên tĩnh và riêng tư</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-shield-alt"></i>
                <span>Tiện nghi cao cấp và dịch vụ tận tình</span>
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
    mealPreorder: {
      title: "Đặt Trước Suất Ăn",
      content: (
        <div className={styles.serviceContent}>
          <h2>Đặt Trước Suất Ăn</h2>
          <p>
            Thưởng thức bữa ăn ngon miệng và đa dạng trên chuyến bay với dịch vụ
            đặt trước suất ăn của chúng tôi.
          </p>

          <div className={styles.serviceDescription}>
            <p>
              Chúng tôi cung cấp nhiều lựa chọn suất ăn phong phú, từ các món ăn
              truyền thống đến các món ăn quốc tế, đảm bảo đáp ứng mọi nhu cầu
              ẩm thực của hành khách.
            </p>
          </div>

          <div className={styles.seatTypes}>
            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-utensils"></i>
                <h4>Thực Đơn Đa Dạng</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn truyền thống Việt Nam</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn quốc tế</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn chay</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn cho trẻ em</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.seatDivider}></div>

            <div className={styles.seatCategory}>
              <div className={styles.categoryHeader}>
                <i className="fas fa-concierge-bell"></i>
                <h4>Suất Ăn Đặc Biệt</h4>
              </div>
              <div className={styles.categoryContent}>
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn không chứa gluten</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn không chứa lactose</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Suất ăn theo yêu cầu đặc biệt</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.benefitsSection}>
            <h3>
              <i className="fas fa-gift"></i>
              Lợi ích khi đặt trước suất ăn
            </h3>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <i className="fas fa-heart"></i>
                <span>Đảm bảo có suất ăn yêu thích</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-shield-alt"></i>
                <span>Đáp ứng nhu cầu dinh dưỡng đặc biệt</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-clock"></i>
                <span>Tiết kiệm thời gian chọn món trên máy bay</span>
              </div>
              <div className={styles.benefitItem}>
                <i className="fas fa-plane-departure"></i>
                <span>Trải nghiệm ẩm thực phong phú</span>
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
