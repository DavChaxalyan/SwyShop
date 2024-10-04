import React from "react";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const cartItems = useSelector((state) => state.products.cart);
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log(totalPrice, cartItems);

  return (
    <div className="cart-summary">
      <h3>Select delivery address</h3>
      <div className="summary-block-count">
        <h3 style={{ margin: "0" }}>
          Products,{" "}
          {cartItems.reduce((total, item) => total + item.quantity, 0)} pcs.
        </h3>
        <p style={{ margin: "0" }}>{totalPrice.toFixed(1)} AMD</p>
      </div>
      <div className="summary-block">
        <h3 style={{ margin: "0" }}>Total</h3>
        <p style={{ margin: "0" }}>{totalPrice.toFixed(1)} AMD</p>
      </div>
      <button style={{ marginTop: "20px" }} className="order-button">
        Order
      </button>
    </div>
  );
};

export default CartSummary;
