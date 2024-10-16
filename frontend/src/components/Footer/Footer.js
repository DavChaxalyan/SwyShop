import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2>About Us</h2>
          <p>
            We are an online shop offering the best selection of products at affordable prices. Our customers are always satisfied with the quality of service and fast delivery.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h2>Useful Links</h2>
          <ul>
            <li><Link to={"/about"}>About Us</Link></li>
            <li><Link to={"/products"}>Shop</Link></li>
            <li><Link to={"/contact"}>Contact</Link></li>
            <li><Link to={"/faq"}>FAQ</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Contact</h2>
          <p><i className="fas fa-envelope"></i> sswayshop@gmail.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Yerevan, Armenia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
