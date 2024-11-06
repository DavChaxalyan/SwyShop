import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/orderActions";
import styles from "./Order.module.css";
import { getUserIdFromToken } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.products.cart);

  const totalAmount = cartItems?.reduce(
    (total, item) =>
      total +
      item.price *
        item?.whoInCart.find(
          (user) => user.userId.toString() === getUserIdFromToken()
        )?.count,
    0
  );

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [animationClass, setAnimationClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError(
        t("order-item-cart-empty")
      );
      return;
    }

    const customerId = getUserIdFromToken();

    const orderData = {
      customerId,
      customerName,
      address,
      contact,
      items: cartItems,
      totalAmount,
    };

    dispatch(createOrder(orderData))
      .then(() => {
        setSuccess(t("order-item-successfully"));
        setError("");
        setAnimationClass(styles.successAnimation);

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((err) => {
        setError(t("order-item-error"));
        setSuccess("");
      });
  };

  useEffect(() => {
    if (success) {
      setAnimationClass(styles.successAnimation);
    }
  }, [success]);

  return (
    <div className={styles.orderPage}>
      <h1 className={styles.orderTitle}>{t("order-title")}</h1>
      <div className={styles.orderDetails}>
        <h2>{t("order-subtitle")}</h2>
        {cartItems.length === 0 ? (
          <p>{t("order-item-empty-cart")}</p>
        ) : (
          <ul className={styles.listProducts}>
            {cartItems.map((item) => (
              <li key={item._id || item.id} className={styles.orderItem}>
                <img
                  src={
                    item.statimage
                      ? `http://localhost:5000/${item.statimage}`
                      : `http://localhost:5000/${item.image}`
                  }
                  alt={item.name}
                  className={styles.orderItemImage}
                />
                <div className={styles.orderItemInfo}>
                  <h3>{item.name}</h3>
                  <p>
                  {t("order-item-quantity")}:{" "}
                    {
                      item?.whoInCart.find(
                        (user) =>
                          user.userId.toString() === getUserIdFromToken()
                      )?.count
                    }
                  </p>
                  <p>{t("order-item-price")}: {item.price} $</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.totalAmount}>
          {t("order-item-total-price")}: {totalAmount.toFixed(1)} $
        </h3>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && (
        <p className={`${styles.success} ${animationClass}`}>{success}</p>
      )}
      <form className={styles.orderForm} onSubmit={handleSubmit}>
        <h2>{t("order-delivery-lb1")}</h2>
        <div className={styles.formGroup}>
          <label htmlFor="customerName">{t("order-delivery-lb2")}</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">{t("order-delivery-lb3")}</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact">{t("order-delivery-lb4")}</label>
          <input
            type="tel"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.orderButton}>
        {t("order-delivery-button")}
        </button>
      </form>
    </div>
  );
};

export default Order;
