import React from 'react';
import styles from './CartIcon.module.css';
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = ({ itemCount }) => {
  return (
    <div className={styles.cartIconContainer}>
      <FaCartShopping style={{fontSize: '20px'}} />
      {itemCount > 0 && <span className={styles.cartItemCount}>{itemCount}</span>}
    </div>
  );
};

export default CartIcon;