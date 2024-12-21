import React, { useState, useEffect } from "react";
import {
  getAdmins,
  updateAdmin,
  deleteAdmin,
  createAdmin,
} from "../../services/adminService";
import AdminSidebar from "../../components/AdminSidebar";
import styles from "./AccountManager.module.css";

/**
 * AccountManager component manages the admin accounts.
 * It allows fetching, creating, updating, and deleting admin accounts.
 * It also handles the display of a modal for adding or editing an admin.
 *
 * @component
 * @example
 * return (
 *   <AccountManager />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name AccountManager
 *
 * @property {Array} admins - The list of admin accounts.
 * @property {Function} setAdmins - Function to set the list of admin accounts.
 * @property {Object|null} selectedAdmin - The currently selected admin for editing.
 * @property {Function} setSelectedAdmin - Function to set the selected admin.
 * @property {Object} adminData - The data of the admin being added or edited.
 * @property {Function} setAdminData - Function to set the admin data.
 * @property {boolean} isModalOpen - State to control the visibility of the modal.
 * @property {Function} setIsModalOpen - Function to set the modal visibility.
 *
 * @function useEffect - Fetches the list of admins when the component mounts.
 * @function handleInputChange - Handles input changes in the admin form.
 * @function handleFormSubmit - Handles form submission for adding or updating an admin.
 * @function handleAdminClick - Handles the click event for editing an admin.
 * @function handleAddNewAdmin - Handles the event for adding a new admin.
 * @function handleDeleteAdmin - Handles the event for deleting an admin.
 * @function handleCloseModal - Handles the event for closing the modal.
 */
const AccountManager = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminData, setAdminData] = useState({
    username: "",
    role: "",
    permissions: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAdmins();
        setAdmins(response);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAdmin) {
        await updateAdmin(selectedAdmin.admin_id, adminData);
        alert("Admin đã được cập nhật thành công!");
      } else {
        await createAdmin(adminData);
        alert("Admin mới đã được thêm thành công!");
      }
      setIsModalOpen(false);
      const updatedAdmins = await getAdmins();
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error submitting admin data:", error);
      alert("Cập nhật admin thất bại. Vui lòng thử lại.");
    }
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setAdminData({
      username: admin.username,
      role: admin.role,
      permissions: admin.permissions,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleAddNewAdmin = () => {
    setSelectedAdmin(null);
    setAdminData({
      username: "",
      role: "",
      permissions: "",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteAdmin = async (adminId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa admin này không?")) {
      try {
        await deleteAdmin(adminId);
        alert("Admin đã được xóa thành công!");
        const updatedAdmins = await getAdmins();
        setAdmins(updatedAdmins);
      } catch (error) {
        console.error("Error deleting admin:", error);
        alert("Xóa admin thất bại. Vui lòng thử lại.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.mainContent}>
        <h1>Quản lý tài khoản admin</h1>
        <button className={styles.addButton} onClick={handleAddNewAdmin}>
          Thêm admin mới
        </button>
        <div className={styles.listContainer}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th>Quyền hạn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.admin_id}>
                  <td>{admin.username}</td>
                  <td>{admin.role}</td>
                  <td>{admin.permissions}</td>
                  <td>
                    <button onClick={() => handleAdminClick(admin)}>
                      Chỉnh sửa
                    </button>
                    <button onClick={() => handleDeleteAdmin(admin.admin_id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <h2>{selectedAdmin ? "Chỉnh sửa admin" : "Thêm admin mới"}</h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  name="username"
                  value={adminData.username}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Vai trò:</label>
                <input
                  type="text"
                  name="role"
                  value={adminData.role}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Quyền hạn:</label>
                <input
                  type="text"
                  name="permissions"
                  value={adminData.permissions}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  name="password"
                  value={adminData.password}
                  onChange={handleInputChange}
                  required={!selectedAdmin}
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                {selectedAdmin ? "Lưu thay đổi" : "Thêm admin"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
