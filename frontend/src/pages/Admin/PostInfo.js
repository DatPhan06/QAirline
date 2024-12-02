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
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./PostInfo.module.css";

const PostInfo = () => {
  const [activeSection, setActiveSection] = useState("generalInfo");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchData();
  }, [activeSection]);

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
    setFormData({ title: "", content: "", id: null });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      switch (activeSection) {
        case "generalInfo":
          await createGeneralInfo(formData);
          break;
        case "news":
          await createNews(formData);
          break;
        case "promotions":
          await createPromotion(formData);
          break;
        case "notifications":
          await createNotification(formData);
          break;
        default:
          break;
      }
      alert("Data posted successfully!");
      fetchData();
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, content: item.content, id: item.id });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      switch (activeSection) {
        case "generalInfo":
          await updateGeneralInfo(formData.id, formData);
          break;
        case "news":
          await updateNews(formData.id, formData);
          break;
        case "promotions":
          await updatePromotion(formData.id, formData);
          break;
        case "notifications":
          await updateNotification(formData.id, formData);
          break;
        default:
          break;
      }
      alert("Data updated successfully!");
      fetchData();
      setFormData({ title: "", content: "", id: null });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      switch (activeSection) {
        case "generalInfo":
          await deleteGeneralInfo(id);
          break;
        case "news":
          await deleteNews(id);
          break;
        case "promotions":
          await deletePromotion(id);
          break;
        case "notifications":
          await deleteNotification(id);
          break;
        default:
          break;
      }
      alert("Data deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
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
        <form
          onSubmit={formData.id ? handleUpdate : handleCreate}
          className={styles.form}
        >
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
            {formData.id ? "Update" : "Create"}
          </button>
        </form>
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
