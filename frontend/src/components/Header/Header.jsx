import React, { useState, useEffect, useRef } from "react";
import CartIcon from "../Cart/CartIcon";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import appLogo from "../../assets/images/swayshop-logo.png";
import { useSelector } from "react-redux";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { RiProfileFill } from "react-icons/ri";
import { FaBars } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import imageProfile from "../../assets/images/profile-empty.png";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import CurrencySwitcher from "../CurrencySwitcher";

const Header = () => {
  const { t } = useTranslation();
  const cartItemsCount = useSelector((state) => state?.products?.cart?.length);
  const state = useSelector((state) => state.user.ProfileUser);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const switcherRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePage = (url) => {
    navigate(`/${url}`);
    if (url === "login") {
      window.location.reload();
      localStorage.removeItem("token");
    }
  };

  const handleAddProduct = () => {
    if (localStorage.getItem("token")) {
      navigate("/add-product");
    } else {
      navigate("/login");
      setTimeout(() => {
        alert(t("product-cart-button-add-product-no-login"));
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.swyShop} onClick={() => setIsMenuOpen(false)}>
          <img src={appLogo} alt="logo" />
          SwayShop
        </NavLink>
      </div>
    <div ref={switcherRef}> 
      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <NavLink
              onClick={() => {
                handleAddProduct()
                setIsMenuOpen(false)
              }}
              to={localStorage.getItem("token") ? "/add-product" : "/login"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                cursor: "pointer",
              }}
              className={({ isActive }) =>
                isActive && localStorage.getItem("token") ? styles.active : ""
              }
            >
              <IoMdAdd />
              {t("navbar-post-an-ad")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar-home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar-products")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navbar-contact")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.activeCard : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              <CartIcon itemCount={cartItemsCount} />
            </NavLink>
          </li>
          {!localStorage.getItem("token") ? (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar-sign-in")}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavDropdown
                title={
                  <img
                    src={
                      state?.profileImage
                        ? `https://swyshop.onrender.com/${state?.profileImage}`
                        : imageProfile
                    }
                    className={styles.roundedCircle}
                    height="40"
                    width="40"
                    alt="Profile"
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    setIsMenuOpen(false)
                    handlePage("profile")
                  }}
                  className="d-flex align-items-center gap-2 text-black"
                >
                  <RiProfileFill />
                  {t("navbar-your-profile")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setIsMenuOpen(false)
                    handlePage("favorite")
                  }}
                  className="d-flex align-items-center gap-2 text-black"
                  style={{ paddingLeft: "13px" }}
                >
                  <IoMdHeart
                    style={{
                      color: "gray",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                  {t("navbar-favorites")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handlePage("login")}
                  className="d-flex align-items-center gap-2 text-black"
                  style={{ paddingLeft: "19px" }}
                >
                  <IoLogOutSharp />
                  {t("navbar-log-out")}
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          )}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <CurrencySwitcher />
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;
