import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/actions/authActions";
import styles from "./ResetPassword.module.css";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
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

      if (response.message === "Password changed successfully") {
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
        <h2 className={styles.title}>{t("reset-form-title")}</h2>
        <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("reset-form-input1")}
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
              placeholder={t("reset-form-input2")}
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {t("reset-form-reset-button")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
