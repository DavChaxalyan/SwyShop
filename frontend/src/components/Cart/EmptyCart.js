import React from "react";
import styles from "./EmptyCart.module.css";
import { Link } from "react-router-dom";
import NoCartProductsFound from "../Errors/NoCartProducts";

const EmptyCart = () => {
  return (
    // <div className={styles.emptyCartContainer}>
    //   <h2>Your cart is currently empty</h2>
    //   <p>
    //     Visit the main page to choose products or use the search to find what
    //     you need
    //   </p>
    //
    // </div>
    // <div>
      <NoCartProductsFound />
  );
};

export default EmptyCart;
