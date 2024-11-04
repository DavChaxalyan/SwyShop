import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../redux/actions/authActions";
import styles from "./EmailVerification.module.css";

const EmailVerification = () => {
    const state = useSelector((state) => state);
  const [verificationCode, setVerificationCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyEmail(state.auth.email, verificationCode));
    
    if (localStorage.getItem('token')) {
        navigate('/');
    } else {
        alert("Invalid confirmation code.");
    }
  };

  return (
    <div className={styles.verificationPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Confirm your email</h2>
        <p className={styles.subtitle}>We have sent a code to {state.auth.email}. Enter it below.</p>

        <form onSubmit={handleSubmit} className={styles.verificationForm}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Confirmation code"
            required
            className={styles.inputField}
          />

          <button type="submit" className={styles.submitButton}>
          Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
