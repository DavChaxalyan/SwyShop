// src/App.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItems";
import CartSummary from "./CartSummary";
import CheckoutSection from "./CheckoutSection";
import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const cartItems = useSelector((state) => state.products.cart);
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className={styles.cartContainer}>
      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            <div className={styles.titleCard}>
              <h3>Cart</h3>
              <span>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                product
              </span>
            </div>
            {cartItems?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.cartSummarySection}>
            <CartSummary />
            <CheckoutSection />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
