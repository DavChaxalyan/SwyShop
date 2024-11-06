import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../redux/actions/authActions";
import styles from "./EmailVerification.module.css";
import { useTranslation } from "react-i18next";

const EmailVerification = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state);
  const [verificationCode, setVerificationCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyEmail(state.auth.email, verificationCode));

    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      alert("Invalid confirmation code.");
    }
  };

  return (
    <div className={styles.verificationPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{t("email-verification-title")}</h2>
        <p className={styles.subtitle}>
          {t("email-verification-text-part1")} {state.auth.email}.{" "}
          {t("email-verification-text-part2")}
        </p>

        <form onSubmit={handleSubmit} className={styles.verificationForm}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder={t("email-verification-placeholder")}
            required
            className={styles.inputField}
          />

          <button type="submit" className={styles.submitButton}>
            {t("email-verification-confirm")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
