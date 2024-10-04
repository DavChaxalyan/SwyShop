import React from "react";
import "./EmptyCart.css";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <h2>Your cart is currently empty</h2>
      <p>
        Visit the main page to choose products or use the search to find what
        you need
      </p>
      <Link to={"/"}>
        <button className="go-to-main-button">Go to main page</button>
      </Link>
    </div>
  );
};

export default EmptyCart;
