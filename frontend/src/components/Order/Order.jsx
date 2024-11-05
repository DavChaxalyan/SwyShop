import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/orderActions";
import styles from "./Order.module.css";
import { getUserIdFromToken } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";

const Order = () => {
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
        "Your cart is empty. Please add items before proceeding to checkout."
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
        setSuccess("Order successfully placed!");
        setError("");
        setAnimationClass(styles.successAnimation);

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((err) => {
        setError("Error placing the order. Please try again.");
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
      <h1 className={styles.orderTitle}>Order Checkout</h1>
      <div className={styles.orderDetails}>
        <h2>Your Products</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
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
                    Quantity:{" "}
                    {
                      item?.whoInCart.find(
                        (user) =>
                          user.userId.toString() === getUserIdFromToken()
                      )?.count
                    }
                  </p>
                  <p>Price: {item.price} $</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.totalAmount}>
          Total Price: {totalAmount.toFixed(1)} $
        </h3>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && (
        <p className={`${styles.success} ${animationClass}`}>{success}</p>
      )}
      <form className={styles.orderForm} onSubmit={handleSubmit}>
        <h2>Delivery Information</h2>
        <div className={styles.formGroup}>
          <label htmlFor="customerName">Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.orderButton}>
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Order;
