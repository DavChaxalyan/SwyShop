import React from "react";
import styles from "./NoProductsFound.module.css";
import { GiBrokenHeart } from "react-icons/gi";
import productNotFoundImg from "../../assets/images/no-favorite.webp"
import { useTranslation } from "react-i18next";

const NoFavoriteProducts = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className={styles.container}>
      <div className={styles.messageWrapper}>
        <h1 className={styles.title}>{t("error-no-favorite-product-title")}</h1>
        <p className={styles.subtitle}>
        {t("error-no-favorite-product-subtitle")}
        </p>
        <div className={styles.animationWrapper}>
          <div className={styles.box}>
            <GiBrokenHeart style={{fontSize: '100px', color: 'black'}}/>
          </div>
        </div>
      </div>
    </div>
    <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: '#ffffff00'}}>
        <img src={productNotFoundImg} alt="product not found" style={{height: '450px'}}/>
    </div>
    </>
  );
};

export default NoFavoriteProducts;
