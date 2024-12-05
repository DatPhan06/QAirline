import React, { useState } from "react";
import styles from "./CheckIn.module.css";

const CheckIn = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Tới quầy làm thủ tục ở sân bay ",
      content: "Tại sân bay, quý khách vui lòng theo dõi bảng điện tử hiển thị thông tin các chuyến bay tại nhà ga hành khách để biết khu vực quầy làm thủ tục chuyến bay của mình. Mỗi hãng hàng không sẽ có khu vực quầy thủ tục khác nhau. Khi tới quầy, nhân viên phục vụ mặt đất sẽ kiểm tra mã đặt chỗ/ vé máy bay và giấy tờ tùy thân của hành khách cùng người đi kèm. Hành lý kí gửi mang theo sẽ được đặt lên băng truyền để cân và vận chuyển riêng. ",
    },
    {
      number: 2,
      title: "Nhận thẻ lên máy bay (Boarding pass) ",
      content: "Sau khi hoàn tất kiểm tra thông tin đặt chỗ và giấy tờ tùy thân của hành khách, nhân viên phục vụ sẽ gửi lại các giấy tờ liên quan kèm thẻ lên tàu bay và hướng dẫn hành khách số cổng lên tàu (gate). ",
    },
    {
      number: 3,
      title: "Di chuyển tới cổng an ninh của sân bay ",
      content: "Sau khi nhận thẻ lên máy bay, quý khách di chuyển tới cổng an ninh. Tại đây, nhân viên an ninh sân bay sẽ yêu cầu quý khách cởi bỏ các phụ kiện như đồng hồ, giày dép, mũ, thắt lưng, túi xách… để vào 1 chiếc khay và bước qua máy soi chiếu an ninh. ",
    },
    {
      number: 4,
      title: "Di chuyển tới cửa ra máy bay ",
      content: "Sau khi đã hoàn thành các thủ tục trước chuyến bay, kiểm tra an ninh, hải quan, xuất nhập cảnh, hành khách cần có mặt tại cửa ra máy bay từ 30 đến 40 phút trước giờ khởi hành của chuyến bay. Trong thời gian chờ lên máy bay, hành khách đi hạng Thương gia hoặc đặt mua Voucher sử dụng phòng chờ Thương gia có thể sử dụng dịch vụ tại Phòng chờ Thương gia. Tại thời điểm 15 phút trước giờ khởi hành của chuyến bay, nếu hành khách không có mặt tại cửa ra máy bay, chúng tôi sẽ làm các thủ tục liên quan đến việc không thực hiện chuyến bay của hành khách. ",
    },
    {
      number: 5,
      title: "Lên máy bay ",
      content: "Sau khi lên tàu bay, quý khách hãy nhìn số ghế (seat) được ghi trên vé máy bay để di chuyển và tìm đúng vị trí ngồi của mình. Thông thường, ghế sẽ được ghi theo hàng chữ và cột số để bạn dễ tìm kiếm nhất. Đừng quên  cất vali, balo hoặc đồ đạc trên khoang hành lý phía trên đầu sau đó đóng cửa khoang lại và ngồi xuống, thắt dây an toàn, chờ máy bay cất cánh. ",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Phần đầu - Thông tin giới thiệu */}
      <header className={styles.header}>
        <h1>Làm thủ tục tại sân bay</h1>
        <p>
          Để hành trình với QAirline được bắt đầu suôn sẻ và thuận lợi, Quý khách vui lòng lưu ý một số thông
          tin dưới đây khi làm thủ tục tại sân bay:
        </p>
        <h2>Hướng dẫn làm thủ tục tại sân bay</h2>
      </header>

      {/* Phần giữa - Các bước làm thủ tục */}
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          {steps.map((step) => (
            <button
              key={step.number}
              className={`${styles.button} ${activeStep === step.number ? styles.active : ""}`}
              onClick={() => setActiveStep(step.number)}
            >
              {step.number}. {step.title}
            </button>
          ))}
        </aside>
        <section className={styles.content}>
          <h2>{steps.find((step) => step.number === activeStep).title}</h2>
          <p>{steps.find((step) => step.number === activeStep).content}</p>
        </section>
      </main>

      {/* Phần cuối - Lưu ý */}
      <footer className={styles.footer}>
        <h3>Lưu ý:</h3>
        <ul>
          <li>
            Khi chuyến bay thay đổi kế hoạch, thời gian mở quầy, đóng quầy làm thủ tục sẽ được điều chỉnh
            phù hợp với giờ bay mới.
          </li>
          <li>
            Thời gian mở quầy, đóng quầy làm thủ tục tùy thuộc vào quy định của nhà chức trách tại sân
            bay và từng hãng hàng không.
          </li>
          <li>
            Hành khách phải thu xếp thời gian có mặt tại sân bay để đảm bảo hoàn thành các thủ tục chuyến
            bay, hải quan, an ninh, xuất nhập cảnh đúng giờ.
          </li>
          <li>
            QAirline không chấp nhận vận chuyển hành khách đến làm thủ tục chuyến bay từ sau
            thời điểm đóng quầy làm thủ tục.
          </li>
          <li>
            QAirline không phải chịu trách nhiệm về các chứng từ vận chuyển và các thủ tục pháp
            lý liên quan đến việc hành khách không thực hiện chuyến bay do không có mặt tại cửa ra
            máy bay theo thời gian quy định đã được đề cập ở trên.
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default CheckIn;
