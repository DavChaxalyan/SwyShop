import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/actions/authActions";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
        const response = await dispatch(resetPassword({ token, password }));
    
        if (response.message === 'Password changed successfully') {
          navigate("/login");
        } 
      } catch (error) {
        console.error("Error resetting password:", error);
        alert("An error occurred. Please try again.");
      }
  };

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Reset Your Password</h2>

        <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
