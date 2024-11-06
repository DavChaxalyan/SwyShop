import React from "react";
import styles from "./NoProductsFound.module.css";
import { CgSmileNeutral } from "react-icons/cg";
import productNotFoundImg from "../../assets/images/no-product.png"
import { useTranslation } from "react-i18next";

const NoProductsFound = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className={styles.container}>
      <div className={styles.messageWrapper}>
        <h1 className={styles.title}>{t("error-no-product-found-title")}</h1>
        <p className={styles.subtitle}>
        {t("error-no-product-found-subtitle")}
        </p>
        <div className={styles.animationWrapper}>
          <div className={styles.box}>
            <CgSmileNeutral style={{fontSize: '100px', color: 'black'}}/>
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

export default NoProductsFound;
