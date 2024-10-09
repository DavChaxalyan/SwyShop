import React from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css"

const CartSummary = () => {
  const cartItems = useSelector((state) => state.products.cart);
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartSummary}>
      <h3>Select delivery address</h3>
      <div className={styles.summaryBlockCount}>
        <h3 style={{ margin: "0" }}>
          Products,{" "}
          {cartItems.reduce((total, item) => total + item.quantity, 0)} pcs.
        </h3>
        <p style={{ margin: "0" }}>{totalPrice.toFixed(1)} AMD</p>
      </div>
      <div className={styles.summaryBlock}>
        <h3 style={{ margin: "0" }}>Total</h3>
        <p style={{ margin: "0" }}>{totalPrice.toFixed(1)} AMD</p>
      </div>
      <button style={{ marginTop: "20px" }} className={styles.orderButton}>
        Order
      </button>
    </div>
  );
};

export default CartSummary;
