import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${name}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={styles.contactContainer}>
      <h1>{t("contact-form-title")}</h1>
      <div className={styles.contactInfo}>
        <h2>{t("contact-form-subtitle")}</h2>
        <p>{t("contact-form-label1")}: sswayshop@gmail.com</p>
        <p>{t("contact-form-label2")}: Yerevan, Armenia</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label htmlFor="name">{t("contact-form-input-lb1")}:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputTextarea}
          required
        />
        <label htmlFor="email">{t("contact-form-input-lb2")}:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputTextarea}
          required
        />
        <label htmlFor="message">{t("contact-form-input-lb3")}:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputTextarea}
          required
          style={{resize: 'none'}}
        />
        <button type="submit" className={styles.formButton}>{t("contact-form-contact-button")}</button>
      </form>
    </div>
  );
};

export default Contact;
