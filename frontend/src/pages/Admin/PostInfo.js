import React, { useState } from "react";
import { createAdmin } from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./Admin.module.css";

const PostInfo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin({ title, content });
      alert("Information posted successfully!");
    } catch (error) {
      console.error("Error posting information:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.container}>
        <h1>Post Information</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostInfo;
