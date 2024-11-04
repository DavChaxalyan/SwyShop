import React, { useState } from 'react';
import styles from './ContactPage.module.css';

const Contact = () => {
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
      <h1>Contact Us</h1>
      <div className={styles.contactInfo}>
        <h2>Contact Information</h2>
        <p>Email: sswayshop@gmail.com</p>
        <p>Address: Yerevan, Armenia</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputTextarea}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputTextarea}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputTextarea}
          required
          style={{resize: 'none'}}
        />
        <button type="submit" className={styles.formButton}>Send</button>
      </form>
    </div>
  );
};

export default Contact;
