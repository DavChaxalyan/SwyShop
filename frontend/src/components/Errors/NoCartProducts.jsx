import React from "react";
import styles from "./NoProductsFound.module.css";
import { TbShoppingCartCancel } from "react-icons/tb";
import productNotFoundImg from "../../assets/images/empty-cart.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoCartProductsFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.messageWrapper}>
          <h1 className={styles.title}>{t("error-no-cart-product-title")}</h1>
          <p className={styles.subtitle}>
            {t("error-no-cart-product-subtitle")}
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
          className={styles.productNotFoundImg}
          alt="product not found"
        />
        <Link to={"/"}>
          <button className={styles.goToMainButton}>
            {t("error-no-cart-product-button")}
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoCartProductsFound;
