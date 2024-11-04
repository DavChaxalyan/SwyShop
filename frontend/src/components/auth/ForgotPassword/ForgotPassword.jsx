import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/actions/authActions";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
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
        <h2 className={styles.title}>Forgot Your Password?</h2>
        <p className={styles.subtitle}>Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
