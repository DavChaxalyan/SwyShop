import React from "react";
import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>{t("error-no-page-found-title")}</p>
        <Link to={"/"} className={styles.homeLink}>
          {t("error-no-page-found-button")}
        </Link>
      </div>
      <div className={styles.backgroundAnimation}></div>
    </div>
  );
};

export default NotFoundPage;
