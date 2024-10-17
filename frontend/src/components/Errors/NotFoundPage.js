import React from 'react';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <Link to={"/"} className={styles.homeLink}>Go Back Home</Link>
      </div>
      <div className={styles.backgroundAnimation}></div>
    </div>
  );
};

export default NotFoundPage;
