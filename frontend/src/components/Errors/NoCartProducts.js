import React from "react";
import styles from "./NoProductsFound.module.css";
import { TbShoppingCartCancel } from "react-icons/tb";
import productNotFoundImg from "../../assets/images/empty-cart.png";
import { Link } from "react-router-dom";

const NoCartProductsFound = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.messageWrapper}>
          <h1 className={styles.title}>Your cart is empty</h1>
          <p className={styles.subtitle}>
            Sorry, You don't have any cart products..
          </p>
          <div className={styles.animationWrapper}>
            <div className={styles.box}>
              <TbShoppingCartCancel
                style={{ fontSize: "100px", color: "black" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#ffffff00" }}
      >
        <img
          src={productNotFoundImg}
          alt="product not found"
          style={{ height: "450px" }}
        />
      <Link to={"/"}>
        <button className={styles.goToMainButton}>Go to main page</button>
      </Link>
      </div>
    </>
  );
};

export default NoCartProductsFound;
