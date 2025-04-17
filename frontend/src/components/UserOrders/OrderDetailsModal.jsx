import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import styles from "./OrderDetailsModal.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatCurrency, priceFix } from "../../Utils/utils";

const OrderDetailsModal = ({ order, onClose, orderCount }) => {
  const { t } = useTranslation();
  const { currency, exchangeRates } = useSelector((state) => state.currency);

  if (!order) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalTitleDetail}>
          <h2
            style={{
              color: "#0f5eb3bd",
              fontWeight: "bold",
              marginBottom: "0px",
            }}
          >
            {t("orders-details-title")}
          </h2>
          <CiDeliveryTruck />
        </div>
        <h3>
          {t("orders-details-subtitle1")} ID: {orderCount + 1}
        </h3>
        <p>
          {t("orders-details-subtitle2")}:{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          {t("orders-details-subtitle3")}:{" "}
          <span className={styles[order.status.toLowerCase()]}>
            {order.status}
          </span>
        </p>
        <p>
          {t("orders-details-subtitle4")}:{" "}
          <strong>{formatCurrency(priceFix(currency, order.totalAmount, exchangeRates), currency)}</strong>
        </p>
        <h4>{t("orders-details-subtitle5")}:</h4>
        <div className={styles.productList}>
          {order.items.map((item) => (
            <div key={item._id} className={styles.productItem}>
              <img
                src={
                  item.productId.statimage
                    ? `https://swyshop.onrender.com/${item.productId.statimage}`
                    : `https://swyshop.onrender.com/${item.productId.image}`
                }
                alt={item.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h5>{item.name}</h5>
                <p>
                  {t("orders-details-lb1")}: {item.productId.category}
                </p>
                <p>
                  {t("orders-details-lb2")}: {item.productId.color}
                </p>
                <p>
                  {t("orders-details-lb3")}: x{item.quantity}
                </p>
                <p>
                  {t("orders-details-lb4")}:{" "}
                  <strong>{formatCurrency(priceFix(currency, item.price, exchangeRates), currency)}</strong>
                </p>
                <p className={styles.rating}>
                  {t("orders-details-lb5")}: {item.productId.rating} (
                  {item.productId.reviewsCount} {t("orders-details-lb6")})
                </p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          {t("modal-form-input-close")}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
