import React from "react";

const CheckoutSection = () => {
  return (
    <div className="checkout-section">
      <h3>Delivery method</h3>
      <p style={{ color: "green", cursor: "pointer" }}>
        <strong>Select delivery address</strong>
      </p>
      <h3>Payment method</h3>
      <p>
        <strong style={{ color: "green", cursor: "pointer" }}>
          Sign in or register
        </strong>{" "}
        to choose a payment method
      </p>
      <h3>My details</h3>
      <p>
        <strong style={{ color: "green", cursor: "pointer" }}>
          Sign in or register
        </strong>{" "}
        to place your order
      </p>
    </div>
  );
};

export default CheckoutSection;
