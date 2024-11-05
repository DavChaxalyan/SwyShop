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
import imageProfile from '../../assets/images/profile-empty.png'

const Header = () => {
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
          alert("You need to log in or register to post an ad.");
      }, 300)
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
              className={({ isActive }) => (isActive && localStorage.getItem("token") ? styles.active : "")}
            >
              <IoMdAdd />
              Post an add
            </NavLink>
          </li>
          <li >
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? styles.active : "")}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : "")}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.activeCard : "")}>
              <CartIcon itemCount={cartItemsCount} />
            </NavLink>
          </li>
          {!localStorage.getItem("token") ? (
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Sign In</NavLink>
            </li>
          ) : (
            <li>
              <NavDropdown
                title={
                  <img
                    src={ state?.profileImage
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
                  Your Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handlePage("favorite")}
                  className="d-flex align-items-center gap-2 text-black"
                  style={{paddingLeft: '13px'}}
                >
                  <IoMdHeart
                      style={{
                        color: "gray",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  Favorites
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handlePage("login")}
                  className="d-flex align-items-center gap-2 text-black"
                  style={{paddingLeft: '19px'}}
                >
                  <IoLogOutSharp />
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
