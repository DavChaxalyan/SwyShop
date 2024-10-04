import React from 'react';
import CartIcon from '../Cart/CartIcon';
import { Link } from 'react-router-dom';
import './Header.css';
import appLogo from "../../assets/images/swayshop-logo.png"
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
  const cartItemsCount = useSelector((state) => state.products.cart.length);

  return (
    <header className="header">
      <div className="logo">
        <img src={appLogo} alt='logo'/>
        SwayShop
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/add-product" style={{display: 'flex', alignItems: 'center', gap: '3px'}}><IoMdAdd />Post an add</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart"><CartIcon itemCount={cartItemsCount} /></Link></li>
          <li><Link to="/login">Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
