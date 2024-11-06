import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/actions/authActions";
import styles from "./ForgotPassword.module.css";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    await dispatch(forgotPassword(email)); 
  };

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{t("forgot-password-title")}</h2>
        <p className={styles.subtitle}>{t("forgot-password-subtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("forgot-password-placeholder")}
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
          {t("forgot-password-button-reset-link")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
