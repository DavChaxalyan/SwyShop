import React from "react";
import styles from "./Cart.module.css";
import { useTranslation } from "react-i18next";

const CheckoutSection = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.checkoutSection}>
      <h3>{t("cart-checkout-page-title")}</h3>
      <p style={{ color: "green", cursor: "pointer" }}>
        <strong>{t("cart-checkout-page-subtitle")}</strong>
      </p>
      <h3>{t("cart-checkout-page-method")}</h3>
      <p>
        <strong style={{ color: "green", cursor: "pointer" }}>
          {t("cart-checkout-page-sign-or-reg")}
        </strong>{" "}
        {t("cart-checkout-page-choose")}
      </p>
      <h3>{t("cart-checkout-page-details")}</h3>
      <p>
        <strong style={{ color: "green", cursor: "pointer" }}>
          {t("cart-checkout-page-sign-or-reg")}
        </strong>{" "}
        {t("cart-checkout-page-place")}
      </p>
    </div>
  );
};

export default CheckoutSection;
