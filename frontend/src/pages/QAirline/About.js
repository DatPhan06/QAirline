import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <header className={styles.header}>
        <h1>Về QAirline</h1>
        <p>
          Chào mừng bạn đến với QAirline, hãng hàng không hàng đầu mang đến trải
          nghiệm bay tuyệt vời và an toàn.
        </p>
      </header>

      <section className={styles.missionSection}>
        <h2>Sứ Mệnh Của Chúng Tôi</h2>
        <p>
          Tại QAirline, chúng tôi cam kết mang đến cho hành khách những chuyến
          bay an toàn, tiện nghi và đáng nhớ. Chúng tôi không ngừng nỗ lực để
          cải thiện chất lượng dịch vụ và đáp ứng mọi nhu cầu của khách hàng.
        </p>
      </section>

      <section className={styles.historySection}>
        <h2>Lịch Sử Hình Thành</h2>
        <p>
          QAirline được thành lập vào năm 2000 với mục tiêu trở thành hãng hàng
          không hàng đầu khu vực. Trải qua hơn 20 năm phát triển, chúng tôi đã
          mở rộng mạng lưới đường bay đến hơn 50 điểm đến trên toàn thế giới.
        </p>
      </section>

      <section className={styles.valuesSection}>
        <h2>Giá Trị Cốt Lõi</h2>
        <ul>
          <li>
            <strong>An Toàn:</strong> An toàn của hành khách và nhân viên luôn
            là ưu tiên hàng đầu của chúng tôi.
          </li>
          <li>
            <strong>Chất Lượng:</strong> Chúng tôi cam kết cung cấp dịch vụ chất
            lượng cao và trải nghiệm bay tuyệt vời.
          </li>
          <li>
            <strong>Đổi Mới:</strong> Chúng tôi không ngừng đổi mới và cải tiến
            để mang đến những dịch vụ tốt nhất.
          </li>
          <li>
            <strong>Bền Vững:</strong> Chúng tôi chú trọng đến bảo vệ môi trường
            và phát triển bền vững.
          </li>
        </ul>
      </section>

      <section className={styles.teamSection}>
        <h2>Đội Ngũ Của Chúng Tôi</h2>
        <p>
          Đội ngũ nhân viên của QAirline bao gồm những chuyên gia hàng đầu trong
          ngành hàng không, luôn sẵn sàng phục vụ và hỗ trợ hành khách mọi lúc,
          mọi nơi.
        </p>
      </section>

      <section className={styles.contactSection}>
        <h2>Liên Hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, vui lòng liên hệ với chúng
          tôi qua email:{" "}
          <a href="mailto:support@qairline.com">support@qairline.com</a> hoặc số
          điện thoại: <a href="tel:+8419001900">+84 1900 1900</a>.
        </p>
      </section>
    </div>
  );
};

export default About;
