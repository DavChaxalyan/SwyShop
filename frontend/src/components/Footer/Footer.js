import React from 'react';
import styles from './Footer.module.css';

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
            <li><a href="/about">About Us</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Contact</h2>
          <p><i className="fas fa-phone"></i> +1 234 567 890</p>
          <p><i className="fas fa-envelope"></i> info@onlineshop.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Store Address, City</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
