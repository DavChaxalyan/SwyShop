import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/authActions";
import styles from "./Login.module.css";
import { getUser } from "../../../redux/actions/userActions";
import { getUserIdFromToken } from "../../../Utils/utils";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await dispatch(login(formData))

   if (localStorage.getItem('token')) {
   dispatch(getUser(getUserIdFromToken(), localStorage.getItem('token')));
    navigate('/')
   }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{t("login-form-title")}</h2>
        <p className={styles.subtitle}>{t("login-form-subtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("login-form-input1")}
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
              placeholder={t("login-form-input2")}
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {t("login-form-login-button")}
          </button>

          <p className={styles.forgotPassword} onClick={() => navigate('/forgot-password')}>{t("login-form-forgot-password")}</p>

          <p className={styles.noAccount}>
            {t("login-form-have-account")}{" "}
            <Link to="/register" className={styles.registerLink}>
            {t("login-form-have-account-button")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
