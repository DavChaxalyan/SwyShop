import React from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css"
import { NavLink } from "react-router-dom";
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { useTranslation } from "react-i18next";

const CartSummary = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.products.cart);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item?.whoInCart.find(user => user.userId.toString() === getUserIdFromToken())?.count,
    0
  );

  return (
    <div className={styles.cartSummary}>
      <h3>{t("cart-summary-page-title")}</h3>
      <div className={styles.summaryBlockCount}>
        <h3 style={{ margin: "0" }}>
          {t("cart-summary-page-products")},{" "}
          {cartItems.reduce((total, item) => total + item?.whoInCart.find(user => user.userId.toString() === getUserIdFromToken())?.count, 0)} {t("cart-summary-page-pcs")}.
        </h3>
        <p style={{ margin: "0" }}>{formatCurrency(priceFix(currency, totalPrice, exchangeRates), currency)}</p>
      </div>
      <div className={styles.summaryBlock}>
        <h3 style={{ margin: "0" }}>{t("cart-summary-page-total")}</h3>
        <p style={{ margin: "0" }}>{formatCurrency(priceFix(currency, totalPrice, exchangeRates), currency)}</p>
      </div>
      <NavLink to="/order">
      <button style={{ marginTop: "20px" }} className={styles.orderButton}>
        {t("cart-summary-page-order")}
      </button>
      </NavLink>
    </div>
  );
};

export default CartSummary;
