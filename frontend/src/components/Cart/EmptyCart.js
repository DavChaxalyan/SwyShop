import React from "react";
import styles from "./EmptyCart.module.css";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className={styles.emptyCartContainer}>
      <h2>Your cart is currently empty</h2>
      <p>
        Visit the main page to choose products or use the search to find what
        you need
      </p>
      <Link to={"/"}>
        <button className={styles.goToMainButton}>Go to main page</button>
      </Link>
    </div>
  );
};

export default EmptyCart;
