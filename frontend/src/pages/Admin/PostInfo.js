import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faEdit,
  faTrash,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  getGeneralInfo,
  createGeneralInfo,
  updateGeneralInfo,
  deleteGeneralInfo,
} from "../../services/generalInfoService";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../services/newsService";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../services/promotionService";
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../../services/notificationService";
import { getCurrentAdmin } from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./PostInfo.module.css";

const PostInfo = () => {
  const [activeSection, setActiveSection] = useState("generalInfo");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        const adminData = await getCurrentAdmin();
        setCurrentAdmin(adminData);
      } catch (error) {
        console.error("Lỗi khi tải thông tin admin hiện tại:", error);
      }
    };
    fetchCurrentAdmin();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    try {
      let result = [];
      switch (activeSection) {
        case "generalInfo":
          result = await getGeneralInfo();
          break;
        case "news":
          result = await getNews();
          break;
        case "promotions":
          result = await getPromotions();
          break;
        case "notifications":
          result = await getNotifications();
          break;
        default:
          result = [];
      }
      setData(result);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setFormData({});
    setIsEditing(false);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    // Set editId based on active section
    switch (activeSection) {
      case "generalInfo":
        setEditId(item.info_id);
        break;
      case "news":
        setEditId(item.news_id);
        break;
      case "promotions":
        setEditId(item.promotion_id);
        break;
      case "notifications":
        setEditId(item.notification_id);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = async (item) => {
    try {
      switch (activeSection) {
        case "generalInfo":
          await deleteGeneralInfo(item.info_id);
          break;
        case "news":
          await deleteNews(item.news_id);
          break;
        case "promotions":
          await deletePromotion(item.promotion_id);
          break;
        case "notifications":
          await deleteNotification(item.notification_id);
          break;
        default:
          break;
      }
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchLower) ||
      item.content?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAdmin) {
      alert("Vui lòng đăng nhập trước khi đăng bài.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      author_id: currentAdmin.admin_id,
    };

    try {
      if (isEditing) {
        switch (activeSection) {
          case "generalInfo":
            await updateGeneralInfo(editId, dataToSubmit);
            break;
          case "news":
            await updateNews(editId, dataToSubmit);
            break;
          case "promotions":
            await updatePromotion(editId, dataToSubmit);
            break;
          case "notifications":
            await updateNotification(editId, dataToSubmit);
            break;
          default:
            break;
        }
      } else {
        switch (activeSection) {
          case "generalInfo":
            await createGeneralInfo(dataToSubmit);
            break;
          case "news":
            await createNews(dataToSubmit);
            break;
          case "promotions":
            await createPromotion(dataToSubmit);
            break;
          case "notifications":
            await createNotification(dataToSubmit);
            break;
          default:
            break;
        }
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  const renderFormFields = () => {
    switch (activeSection) {
      case "generalInfo":
        return (
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label>Tiêu đề:</label>
              <input
                type="text"
                name="title"
                placeholder="Nhập tiêu đề"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Nội dung:</label>
              <textarea
                name="content"
                placeholder="Nhập nội dung"
                value={formData.content || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case "news":
        return (
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label>Tiêu đề tin tức:</label>
              <input
                type="text"
                name="title"
                placeholder="Nhập tiêu đề tin tức"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Nội dung tin tức:</label>
              <textarea
                name="content"
                placeholder="Nhập nội dung tin tức"
                value={formData.content || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case "promotions":
        return (
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label>Tiêu đề khuyến mãi:</label>
              <input
                type="text"
                name="title"
                placeholder="Nhập tiêu đề khuyến mãi"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Mô tả khuyến mãi:</label>
              <textarea
                name="description"
                placeholder="Nhập mô tả khuyến mãi"
                value={formData.description || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phần trăm giảm giá (%):</label>
              <input
                type="number"
                name="discount_percentage"
                placeholder="Nhập phần trăm giảm giá"
                value={formData.discount_percentage || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Ngày kết thúc:</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label>Tiêu đề thông báo:</label>
              <input
                type="text"
                name="title"
                placeholder="Nhập tiêu đề thông báo"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Nội dung thông báo:</label>
              <textarea
                name="content"
                placeholder="Nhập nội dung thông báo"
                value={formData.content || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Loại thông báo:</label>
              <input
                type="text"
                name="type"
                placeholder="Nhập loại thông báo"
                value={formData.type || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>ID người dùng:</label>
              <input
                type="number"
                name="user_id"
                placeholder="Nhập ID người dùng"
                value={formData.user_id || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>ID chuyến bay:</label>
              <input
                type="number"
                name="flight_id"
                placeholder="Nhập ID chuyến bay"
                value={formData.flight_id || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleGuide = () => {
    setIsGuideOpen(!isGuideOpen);
  };

  const renderGuide = () => (
    <div className={styles.guide}>
      <h2>Hướng dẫn sử dụng trang Quản lý thông tin</h2>
      <p>
        Trang này cho phép bạn quản lý các loại thông tin khác nhau của hệ
        thống. Dưới đây là hướng dẫn chi tiết:
      </p>

      <section>
        <h3>1. Các loại thông tin</h3>
        <ul>
          <li>
            <strong>Thông tin chung:</strong>
            <ul>
              <li>Thông tin cơ bản về hãng hàng không</li>
              <li>Chính sách và quy định chung</li>
            </ul>
          </li>
          <li>
            <strong>Tin tức:</strong>
            <ul>
              <li>Tin tức mới về hoạt động của hãng</li>
              <li>Sự kiện và thông báo quan trọng</li>
            </ul>
          </li>
          <li>
            <strong>Khuyến mãi:</strong>
            <ul>
              <li>Các chương trình giảm giá</li>
              <li>Ưu đãi đặc biệt cho khách hàng</li>
            </ul>
          </li>
          <li>
            <strong>Thông báo:</strong>
            <ul>
              <li>Thông báo cho người dùng cụ thể</li>
              <li>Thông báo về chuyến bay</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3>2. Chức năng chính</h3>
        <ul>
          <li>
            <strong>Tạo mới:</strong>
            <ul>
              <li>Nhấn nút "Thêm mới"</li>
              <li>Điền đầy đủ thông tin theo mẫu</li>
              <li>Nhấn "Lưu" để hoàn tất</li>
            </ul>
          </li>
          <li>
            <strong>Chỉnh sửa:</strong>
            <ul>
              <li>Nhấn vào nút "Sửa" trên mục cần chỉnh sửa</li>
              <li>Cập nhật thông tin trong form</li>
              <li>Nhấn "Lưu thay đổi" để hoàn tất</li>
            </ul>
          </li>
          <li>
            <strong>Xóa:</strong>
            <ul>
              <li>Nhấn nút "Xóa" trên mục cần xóa</li>
              <li>Xác nhận xóa trong hộp thoại</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3>3. Tìm kiếm và Lọc</h3>
        <ul>
          <li>Sử dụng ô tìm kiếm để lọc nội dung</li>
          <li>Chọn loại thông tin từ các tab phía trên</li>
        </ul>
      </section>

      <section>
        <h3>4. Lưu ý quan trọng</h3>
        <ul>
          <li>Đảm bảo đăng nhập với tài khoản admin</li>
          <li>Kiểm tra kỹ thông tin trước khi đăng</li>
          <li>Nội dung phải tuân thủ quy định của hãng</li>
        </ul>
      </section>
    </div>
  );

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminSidebar}>
        <AdminSidebar />
      </div>

      <div className={styles.mainContent}>
        <h1>
          Quản lý thông tin
          <button
            className={styles.guideButton}
            onClick={toggleGuide}
            title="Xem hướng dẫn"
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
        </h1>
        <div className={styles.sectionTabs}>
          <button
            className={`${
              activeSection === "generalInfo" ? styles.active : ""
            }`}
            onClick={() => handleSectionChange("generalInfo")}
          >
            Thông tin chung
          </button>
          <button
            className={`${activeSection === "news" ? styles.active : ""}`}
            onClick={() => handleSectionChange("news")}
          >
            Tin tức
          </button>
          <button
            className={`${activeSection === "promotions" ? styles.active : ""}`}
            onClick={() => handleSectionChange("promotions")}
          >
            Khuyến mãi
          </button>
          <button
            className={`${
              activeSection === "notifications" ? styles.active : ""
            }`}
            onClick={() => handleSectionChange("notifications")}
          >
            Thông báo
          </button>
        </div>

        {/* Add search bar here */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={`Tìm kiếm ${
              activeSection === "generalInfo"
                ? "thông tin chung"
                : activeSection === "news"
                ? "tin tức"
                : activeSection === "promotions"
                ? "khuyến mãi"
                : "thông báo"
            }...`}
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>

        <button
          className={styles.createButton}
          onClick={() => setShowModal(true)}
        >
          Thêm mới{" "}
          {activeSection === "generalInfo"
            ? "Thông tin chung"
            : activeSection === "news"
            ? "Tin tức"
            : activeSection === "promotions"
            ? "Khuyến mãi"
            : "Thông báo"}
        </button>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                {renderFormFields()}
                <button type="submit">
                  {isEditing ? "Cập nhật" : "Đăng bài"}
                </button>
              </form>
            </div>
          </div>
        )}
        {filteredData.map((item) => (
          <div
            key={
              activeSection === "generalInfo"
                ? item.info_id
                : activeSection === "news"
                ? item.news_id
                : activeSection === "promotions"
                ? item.promotion_id
                : item.notification_id
            }
            className={styles.itemCard}
          >
            {" "}
            <div className={styles.itemHeader}>
              <h3>{item.title}</h3>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item)}
                >
                  Xóa
                </button>
              </div>
            </div>
            <div className={styles.itemContent}>
              {activeSection === "generalInfo" && (
                <>
                  <p>
                    <strong>Nội dung:</strong> {item.content}
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Ngày sửa đổi:</strong>{" "}
                    {item.updated_at
                      ? new Date(item.updated_at).toLocaleString()
                      : "Chưa có cập nhật"}
                  </p>
                </>
              )}

              {activeSection === "news" && (
                <>
                  <p>
                    <strong>Nội dung:</strong> {item.content}
                  </p>
                  <p>
                    <strong>Tác giả:</strong> {item.author_id}
                  </p>
                  <p>
                    <strong>Ngày đăng:</strong>{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Ngày sửa đổi:</strong>{" "}
                    {item.updated_at
                      ? new Date(item.updated_at).toLocaleString()
                      : "Chưa có cập nhật"}
                  </p>
                </>
              )}

              {activeSection === "promotions" && (
                <>
                  <p>
                    <strong>Mô tả:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Giảm giá:</strong> {item.discount_percentage}%
                  </p>
                  <p>
                    <strong>Thời gian:</strong>{" "}
                    {new Date(item.start_date).toLocaleDateString()} -{" "}
                    {new Date(item.end_date).toLocaleDateString()}
                  </p>
                </>
              )}
              {activeSection === "notifications" && (
                <>
                  <p>
                    <strong>Nội dung:</strong> {item.content}
                  </p>
                  <p>
                    <strong>Loại:</strong> {item.type}
                  </p>
                  {item.user_id && (
                    <p>
                      <strong>Người dùng:</strong> {item.user_id}
                    </p>
                  )}
                  {item.flight_id && (
                    <p>
                      <strong>Chuyến bay:</strong> {item.flight_id}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {isGuideOpen && (
          <div className={styles.modalOverlay} onClick={toggleGuide}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={toggleGuide}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              {renderGuide()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
