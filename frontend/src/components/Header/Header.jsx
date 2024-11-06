import React from "react";
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
import { IoMdAdd } from "react-icons/io";
import imageProfile from "../../assets/images/profile-empty.png";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const cartItemsCount = useSelector((state) => state?.products?.cart?.length);
  const state = useSelector((state) => state.user.ProfileUser);
  const navigate = useNavigate();
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
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.swyShop}>
          <img src={appLogo} alt="logo" />
          SwayShop
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              onClick={handleAddProduct}
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
            >
              {t("navbar-home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {t("navbar-products")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {t("navbar-contact")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.activeCard : "")}
            >
              <CartIcon itemCount={cartItemsCount} />
            </NavLink>
          </li>
          {!localStorage.getItem("token") ? (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
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
                        ? `http://localhost:5000/${state?.profileImage}`
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
                  onClick={() => handlePage("profile")}
                  className="d-flex align-items-center gap-2 text-black"
                >
                  <RiProfileFill />
                  {t("navbar-your-profile")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handlePage("favorite")}
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
