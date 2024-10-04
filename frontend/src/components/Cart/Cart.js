// src/App.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItems";
import CartSummary from "./CartSummary";
import CheckoutSection from "./CheckoutSection";
import "./Cart.css";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const cartItems = useSelector((state) => state.products.cart);
  console.log(cartItems);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            <div className="title-card">
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
          <div className="cart-summary-section">
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
