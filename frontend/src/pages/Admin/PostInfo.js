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
  const [formData, setFormData] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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
          result = [];
      }
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAdmin) {
      alert("Vui lòng đăng nhập trước khi đăng bài.");
      return;
    }

    const handleEdit = (item) => {
      setFormData(item);
      setIsEditing(true);
      setEditId(item.id);
    };

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
      alert("Data posted successfully!");
      fetchData();
      setFormData({});
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const renderFormFields = () => {
    switch (activeSection) {
      case "generalInfo":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "news":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "promotions":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="discount_percentage"
              placeholder="Discount Percentage"
              value={formData.discount_percentage || ""}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={formData.start_date || ""}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="end_date"
              placeholder="End Date"
              value={formData.end_date || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "notifications":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type || ""}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="user_id"
              placeholder="User ID"
              value={formData.user_id || ""}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="flight_id"
              placeholder="Flight ID"
              value={formData.flight_id || ""}
              onChange={handleInputChange}
            />
          </>
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

        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <button type="submit">
            {isEditing ? "Update" : "Add"} {activeSection}
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
                {activeSection === "notifications" && (
                  <>
                    <p>Type: {item.type}</p>
                    <p>User ID: {item.user_id}</p>
                    <p>Flight ID: {item.flight_id}</p>
                  </>
                )}
                {activeSection === "promotions" && (
                  <>
                    <p>Description: {item.description}</p>
                    <p>Discount: {item.discount_percentage}%</p>
                    <p>Start Date: {item.start_date}</p>
                    <p>End Date: {item.end_date}</p>
                  </>
                )}
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
