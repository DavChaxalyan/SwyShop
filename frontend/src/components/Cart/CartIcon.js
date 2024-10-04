import React from 'react';
import './CartIcon.css';
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = ({ itemCount }) => {
  return (
    <div className="cart-icon-container">
      <FaCartShopping style={{fontSize: '20px'}} />
      {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;