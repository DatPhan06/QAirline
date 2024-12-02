import React, { useState, useEffect } from "react";
import {
  createGeneralInfo,
  getGeneralInfo,
  updateGeneralInfo,
  deleteGeneralInfo,
} from "../../services/generalInfoService";
import {
  createNews,
  getNews,
  updateNews,
  deleteNews,
} from "../../services/newsService";
import {
  createPromotion,
  getPromotions,
  updatePromotion,
  deletePromotion,
} from "../../services/promotionService";
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from "../../services/notificationService";
import { getCurrentAdmin } from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./PostInfo.module.css";

const PostInfo = () => {
  const [activeSection, setActiveSection] = useState("generalInfo");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_id: 0,
  });
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        const adminData = await getCurrentAdmin();
        setCurrentAdmin(adminData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          author_id: adminData.admin_id,
        }));
      } catch (error) {
        console.error("Error fetching current admin:", error);
      }
    };
    fetchCurrentAdmin();
  }, []);

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
          break;
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setFormData({
      title: "",
      content: "",
      author_id: currentAdmin ? currentAdmin.admin_id : 0,
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      alert("Data posted successfully!");
      fetchData();
      setFormData({ title: "", content: "", author_id: currentAdmin.admin_id });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const renderForm = () => {
    switch (activeSection) {
      case "generalInfo":
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create General Info
            </button>
          </form>
        );
      case "news":
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create News
            </button>
          </form>
        );
      case "promotions":
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create Promotion
            </button>
          </form>
        );
      case "notifications":
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create Notification
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminSidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>Manage Information</h1>
        <div className={styles.sectionTabs}>
          <button
            className={`${
              activeSection === "generalInfo" ? styles.active : ""
            }`}
            onClick={() => handleSectionChange("generalInfo")}
          >
            General Info
          </button>
          <button
            className={`${activeSection === "news" ? styles.active : ""}`}
            onClick={() => handleSectionChange("news")}
          >
            News
          </button>
          <button
            className={`${activeSection === "promotions" ? styles.active : ""}`}
            onClick={() => handleSectionChange("promotions")}
          >
            Promotions
          </button>
          <button
            className={`${
              activeSection === "notifications" ? styles.active : ""
            }`}
            onClick={() => handleSectionChange("notifications")}
          >
            Notifications
          </button>
        </div>

        {renderForm()}

        <div className={styles.dataList}>
          <h2>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
            List
          </h2>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
