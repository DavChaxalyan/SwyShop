import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/authActions";
import styles from "./Login.module.css";
import { getUser } from "../../../redux/actions/userActions";
import { jwtDecode } from "jwt-decode";

const Login = () => {
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

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.subtitle}>Log in to your account</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
              placeholder="Password"
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Log In
          </button>

          <p className={styles.forgotPassword} onClick={() => navigate('/forgot-password')}>Forgot your password?</p>

          <p className={styles.noAccount}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
