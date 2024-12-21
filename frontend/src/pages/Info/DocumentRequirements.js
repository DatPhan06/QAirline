// src/components/DocumentRequirements/DocumentRequirements.jsx
import React, { useState, useEffect } from "react";
import styles from "./DocumentRequirements.module.css";

const DocumentRequirements = () => {
  const [activeSection, setActiveSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: "Quy định Xuất Nhập Cảnh",
      content: (
        <div>
          <h2>Quy định Xuất Nhập Cảnh</h2>
          <p>
          Hành khách phải có hộ chiếu và thị thực (nếu được yêu cầu) hợp lệ để được phép nhập cảnh vào từng điểm đến trong hành trình, bao gồm cả điểm quá cảnh (nếu có). Hành khách có trách nhiệm tuân thủ tất cả các yêu cầu về giấy tờ du lịch để vào điểm đến dự định cũng như quốc gia quá cảnh trong hành trình của hành khách. Hành khách có thể kiểm tra các yêu cầu về giấy tờ nhập cảnh tại. 
          <a
              href="https://www.iatatravelcentre.com/passport-visa-health-travel-document-requirements.htm"
              style={{
                fontWeight: 'bold', // In đậm
                textDecoration: 'underline', // Gạch chân
                cursor: 'pointer', // Thay đổi con trỏ khi hover
                
              }}
              target="_blank"
            >
              đây
            </a>.
          Hành khách vui lòng liên hệ với đại sứ quán hoặc lãnh sự quán tại địa phương để xác minh các yêu cầu nhập cảnh và về thị thực của mình.
          </p>
          <p> Quy định xuất nhập cảnh tại Việt Nam</p>
          <ul>
            <li> Đối tượng nhập cảnh 
                Tất cả hành khách (Đã tiêm phòng đầy đủ, không/chưa tiêm phòng đầy đủ) đều được phép nhập cảnh vào Anh khi có các giấy tờ nhập cảnh hợp lệ. </li>

            <li> Các biểu mẫu và Ứng dụng: Không yêu cầu</li>

            <li>Bảo hiểm sức khỏe: Không yêu cầu</li>
            
            <li>Yêu cầu về xét nghiệm COVID-19: 
            Không yêu cầu
            </li>
            <li>Yêu cầu về cách ly: Không yêu cầu</li>
          </ul>

          <p>
          Các hạn chế đi lại của chính phủ có thể thay đổi liên tục và đôi khi được áp dụng mà không có thông báo đầy đủ.</p>
          <p>Thông tin này chỉ mang tính chất tham khảo, không đảm bảo việc xuất nhập cảnh của hành khách. </p>
          <p> <strong> Để nhận được thông tin cập nhật mới nhất, Quý khách vui lòng liên hệ Đại sứ quán ở nước sở tại.</strong>
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Giấy Tờ Tùy Thân & Thị Thực",
      content: (
        <div>
          <h2>Giấy tờ tùy thân & Thị thực</h2>
          <p>
            Để có một hành trình bay thuận lợi, tránh gặp các rắc rối trong quá trình làm thủ tục hàng không cũng như xuất nhập cảnh, hành khách cần chuẩn bị đầy đủ các loại giấy tờ tùy thân theo quy định. Hành khách hãy cùng QAirline tìm hiểu thêm các quy định của Bộ Giao thông Vận tải về giấy tờ tùy thân cho chuyến đi của mình.
          </p>
          <p>
            (Căn cứ Phụ lục VII Thông tin cá nhân khi đi tàu bay; Giấy tờ về nhân thân, vé, thẻ lên tàu bay, ban hành kèm theo Thông tư số 42/2023/TT-BGTVT ngày 29 tháng 12 năm 2023 của Bộ trưởng Bộ Giao thông vận tải).
          </p>
          
          <ol>
            <li>
              <strong>Hành khách khi làm thủ tục đi tàu bay trên các chuyến bay quốc tế phải xuất trình một trong các loại giấy tờ sau:</strong>
              <ul>
                <li>
                  Hộ chiếu hoặc giấy thông hành hoặc giấy tờ khác có giá trị xuất, nhập cảnh theo quy định của pháp luật như thị thực rời, thẻ thường trú, thẻ tạm trú, thẻ căn cước công dân (nếu Việt Nam và quốc gia liên quan ký kết điều ước hoặc thỏa thuận quốc tế cho phép công dân nước ký kết được sử dụng thẻ căn cước công dân thay cho việc sử dụng hộ chiếu trên lãnh thổ của nhau)… (sau đây gọi chung là giấy tờ có giá trị xuất, nhập cảnh theo quy định); trường hợp trẻ em không có hộ chiếu riêng thì họ tên, ngày, tháng, năm sinh và ảnh của trẻ em được ghi và dán vào hộ chiếu của người đại diện theo pháp luật, bao gồm: cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi hoặc người giám hộ.
                </li>
              </ul>
            </li>
            <li>
              <strong>Hành khách từ đủ 14 tuổi trở lên khi làm thủ tục đi tàu bay trên các chuyến bay nội địa phải xuất trình một trong các loại giấy tờ hoặc dữ liệu điện tử có giá trị pháp lý tương đương sau:</strong>
              <ol type="a">
                <li>
                  <strong>Đối với hành khách mang quốc tịch Việt Nam</strong>
                  <ul>
                    <li>Hộ chiếu hoặc giấy thông hành, thị thực rời, thẻ thường trú, thẻ tạm trú, chứng minh nhân dân, thẻ Căn cước công dân;</li>
                    <li>
                      Giấy chứng minh, chứng nhận của công an nhân dân, quân đội nhân dân; giấy chứng minh, chứng nhận của công an nhân dân được quy định tại Nghị định số 59/2008/NĐ-CP ngày 08/05/2008 của chính phủ, Thông tư số 13/2008/TT-BCA ngày 29/08/2008 của Bộ Công an như: Giấy chứng minh Công an nhân dân cấp cho sĩ quan, hạ sĩ quan Công an nhân dân đang phục vụ tại ngũ trong lực lượng Công an nhân dân theo chế độ chuyên nghiệp, giấy chứng nhận cấp cho hạ sĩ quan, chiến sĩ phục vụ có thời hạn, công nhân, nhân viên, nhân viên tạm tuyển đang phục vụ trong lực lượng Công an nhân dân. Giấy chứng minh, chứng nhận của quân đội nhân dân được quy định tại Nghị định số 130/2008/NĐ-CP ngày 19/12/2008; Nghị định số 59/2016/NĐ-CP ngày 01/07/2016 của Chính phủ; Thông tư số 218/2016/TT-BQP ngày 27/12/2016 của Bộ Quốc phòng như: Giấy chứng minh sĩ quan Quân đội nhân dân; Chứng minh quân nhân chuyên nghiệp, công nhân và viên chức quốc phòng; Thẻ hạ sĩ quan, binh sĩ tại ngũ; Thẻ sĩ quan dự bị; Thẻ quân nhân chuyên nghiệp và hạ sĩ quan, binh sĩ dự bị.
                    </li>
                    <li>Thẻ Đại biểu Quốc hội;</li>
                    <li>Thẻ Đảng viên;</li>
                    <li>Thẻ Nhà báo do Bộ Thông tin và Truyền thông cấp được quy định tại Thông tư số 49/2016/TT-BTTTT ngày 26/12/2016 của Bộ Thông tin và Truyền thông;</li>
                    <li>Giấy phép lái xe ô tô, mô tô của Việt Nam cấp. <em>Lưu ý:</em> Giấy phép IDP do Việt Nam cấp không có hiệu lực sử dụng trong nước theo quy định tại Thông tư số 29/2025/TT-BGTVT ngày 06/07/2015 của Bộ Giao thông vận tải;</li>
                    <li>Thẻ của Ủy ban An ninh hàng không dân dụng quốc gia;</li>
                    <li>Thẻ kiểm soát an ninh cảng hàng không, sân bay loại có giá trị sử dụng dài hạn;</li>
                    <li>Thẻ nhận dạng của hãng hàng không Bamboo Airways;</li>
                    <li>Tài khoản định danh điện tử mức độ 2 của hành khách;</li>
                    <li>Giấy xác nhận nhân thân do cơ quan công an xác nhận (giấy xác nhận có các thông tin thể hiện các nội dung sau: cơ quan xác nhận, người xác nhận; ngày, tháng, năm xác nhận; họ và tên, ngày tháng năm sinh, giới tính, nơi thường trú của người được xác nhận; lý do xác nhận. Giấy xác nhận có dán ảnh, đóng dấu giáp lai và chỉ có giá trị trong vòng 30 ngày kể từ ngày xác nhận);</li>
                  </ul>
                </li>
                <li>
                  Hành khách mang quốc tịch Việt Nam từ đủ 14 tuổi đến trên 14 tuổi không quá 20 ngày có thể sử dụng các loại giấy tờ đi tàu bay như đối với hành khách chưa đủ 14 tuổi.
                </li>
                <li>
                  <strong>Đối với hành khách mang quốc tịch nước ngoài</strong>
                  <ul>
                    <li>Hộ chiếu (có dấu kiểm chứng nhập cảnh gần nhất) hoặc giấy tờ có giá trị đi lại quốc tế (có dấu kiểm chứng nhập cảnh gần nhất) và giấy tờ liên quan cư trú tại Việt Nam (thị thực, thẻ thường trú, thẻ tạm trú, thẻ đi lại doanh nhân APEC) trừ trường hợp được miễn thị thực;</li>
                    <li>Chứng minh thư ngoại giao do Bộ Ngoại giao cấp cho thành viên cơ quan đại diện ngoại giao, cơ quan lãnh sự, cơ quan đại diện của tổ chức quốc tế;</li>
                    <li>Giấy phép lái xe ô tô, mô tô của Việt Nam. <em>Trường hợp sử dụng Giấy phép lái xe của nước ngoài, phải mang theo Giấy phép lái xe quốc tế (IDP) và giấy phép lái xe quốc gia được cấp của hành khách, tuân thủ quy định tại Thông tư số 29/2015/TT-BGTVT ngày 06/07/2015 của Bộ Giao thông vận tải;</em></li>
                    <li>Thẻ kiểm soát an ninh cảng hàng không, sân bay loại có giá trị sử dụng dài hạn;</li>
                    <li>Thẻ nhận dạng của hãng hàng không Bamboo Airways;</li>
                    <li>Tài khoản định danh điện tử mức độ 2 của hành khách;</li>
                    <li>Trường hợp hành khách mất hộ chiếu phải có công hàm của cơ quan ngoại giao, lãnh sự của quốc gia hành khách mang quốc tịch hoặc công văn của sở ngoại vụ (có xác nhận của cơ quan công an địa phương nơi hành khách mất hộ chiếu) xác nhận nhân thân và việc mất hộ chiếu của hành khách, có dán ảnh, dấu giáp lai. Công hàm, công văn xác nhận có giá trị sử dụng 30 ngày kể từ ngày xác nhận.</li>
                  </ul>
                </li>
              </ol>
            </li>
            <li>
              <strong>Hành khách chưa đủ 14 tuổi khi làm thủ tục đi tàu bay trên các chuyến bay nội địa phải xuất trình một trong các loại giấy tờ sau:</strong>
              <ol type="a">
                <li>Giấy khai sinh; trích lục hộ tịch; trích lục giấy khai sinh (trích lục thông tin khai sinh); văn bản xác nhận thông tin hộ tịch; trường hợp dưới 02 tháng tuổi chưa có giấy khai sinh thì phải có giấy chứng sinh; Tài khoản định danh điện tử mức độ 2 của hành khách; thông tin nhân thân của hành khách trong Tài khoản định danh điện tử mức độ 2 của bố hoặc mẹ hoặc người giám hộ đi cùng chuyến bay.</li>
                <li>Giấy xác nhận của tổ chức xã hội đối với trẻ em do tổ chức xã hội đang nuôi dưỡng (chỉ có giá trị sử dụng trong thời gian 06 tháng kể từ ngày xác nhận).</li>
                <li>Giấy xác nhận nhân thân do cơ quan công an xác nhận (giấy xác nhận có các thông tin thể hiện các nội dung sau: cơ quan xác nhận, người xác nhận; ngày, tháng, năm xác nhận; họ và tên, ngày tháng năm sinh, giới tính, nơi thường trú của người được xác nhận; lý do xác nhận. Giấy xác nhận có giá trị trong vòng 30 ngày kể từ ngày xác nhận).</li>
                <li>Thẻ Căn cước công dân, chứng minh thư nhân dân, hộ chiếu (hộ chiếu riêng hoặc kèm hộ chiếu của cha mẹ).</li>
                <li>Trường hợp trẻ em không có hộ chiếu riêng: chấp nhận hộ chiếu của người đại diện theo pháp luật (cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi hoặc người giám hộ) của trẻ em đó có chứa các thông tin: họ tên, ngày, tháng, năm sinh và ảnh của trẻ em. Không cần phải có người đại diện theo pháp luật đi cùng trẻ để làm thủ tục hàng không.</li>
              </ol>
            </li>
            <li>
              <strong>Hành khách là phạm nhân, bị can, người đang bị di lý, dẫn độ, trục xuất khi làm thủ tục đi tàu bay chỉ cần có giấy tờ của cơ quan có thẩm quyền chứng minh việc áp giải; hành khách là người áp giải xuất trình các loại giấy tờ theo quy định tại mục 1 và 2.</strong>
            </li>
            <li>
              <strong>Giấy tờ của hành khách sử dụng khi đi tàu bay quy định tại các khoản 1, 2, 3 và 4 phải đảm bảo các điều kiện sau:</strong>
              <ol type="a">
                <li>Là bản chính và còn giá trị sử dụng; hoặc bản điện tử có giá trị pháp lý theo quy định;</li>
                <li>Đối với giấy khai sinh, trích lục hộ tịch; trích lục giấy khai sinh (trích lục thông tin khai sinh); văn bản xác nhận thông tin hộ tịch; giấy chứng sinh phải là bản chính hoặc bản sao có chứng thực theo quy định của pháp luật; hoặc bản điện tử có giá trị pháp lý theo quy định;</li>
                <li>Không chấp nhận giấy tờ tại các khoản 1, 2, 3, 4 Quy định này nếu giấy tờ không có ảnh hoặc ảnh không theo quy định của pháp luật, trừ giấy khai sinh, giấy chứng sinh, trích lục hộ tịch; trích lục khai sinh; văn bản xác nhận thông tin hộ tịch, giấy tờ của cơ quan có thẩm quyền chứng minh việc áp giải.</li>
                <li>Nếu là tài khoản định danh điện tử mức độ 2, giấy khai sinh điện tử của hành khách thì phải đảm bảo khi xuất trình, tài khoản đang hoạt động bình thường.</li>
              </ol>
            </li>
          </ol>
        </div>
      ),
    },
  ];

  const openSection = (id) => {
    setActiveSection(id);
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  // Thêm sự kiện để đóng modal khi nhấn phím Esc
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeSection();
      }
    };
    if (activeSection !== null) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeSection]);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {/* Sidebar bên trái chứa các nút */}
        <aside className={styles.sidebar}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.button} ${
                activeSection === section.id ? styles.active : ""
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </aside>

        {/* Frame bên phải hiển thị nội dung */}
        <div className={styles.content}>
          {sections.find((section) => section.id === activeSection)?.content}
        </div>
      </main>
    </div>
  );
};

export default DocumentRequirements;
