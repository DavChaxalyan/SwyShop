import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection} style={{ maxWidth: '200px' }}>
          <h2>{t("footer-section-title1")}</h2>
          <p>
            {t("footer-section-about-us-subtitle1")}
          </p>
        </div>

        <div className={styles.footerSection}>
          <h2>{t("footer-section-title2")}</h2>
          <ul>
            <li><Link to={"/about"}>{t("footer-section-useful-subtitle1")}</Link></li>
            <li><Link to={"/products"}>{t("footer-section-useful-subtitle2")}</Link></li>
            <li><Link to={"/contact"}>{t("footer-section-useful-subtitle3")}</Link></li>
            <li><Link to={"/faq"}>{t("footer-section-useful-subtitle4")}</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>{t("footer-section-title3")}</h2>
          <p><i className="fas fa-envelope"></i> sswayshop@gmail.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Yerevan, Armenia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
