import React, { useState } from 'react';
import './ContactPage.css';

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
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: support@onlineshop.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Online St, Shop City, Shopland</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{resize: 'none'}}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
