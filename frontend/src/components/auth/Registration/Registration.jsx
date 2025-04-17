import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../redux/actions/authActions";
import styles from "./Registration.module.css";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await dispatch(register(formData));
  };

  useEffect(() => {
    if (state.auth.emailSent) {
      navigate("/verify-email", { state: { email: formData.email } });
    }
  }, [state.auth.emailSent, formData.email, navigate]);

  useEffect(() => {
    if (state.auth.error) {
      alert(state.auth.error);
    } else if (state.auth.error === "") {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [state.auth.error]);

  return (
    <div>
      <div className={styles.registrationPage}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>{t("registration-form-title")}</h2>
          <p className={styles.subtitle}>{t("registration-form-subtitle")}</p>

          <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("registration-form-input1")}
                required
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("registration-form-input2")}
                required
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("registration-form-input3")}
                required
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("registration-form-input4")}
                required
                className={styles.inputField}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {t("registration-form-registration-button")}
            </button>
          </form>
          <p className={styles.alreadyHaveAccount}>
            {t("registration-form-have-account")}{" "}
            <Link to="/login" className={styles.loginLink}>
            {t("registration-form-have-account-button")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
