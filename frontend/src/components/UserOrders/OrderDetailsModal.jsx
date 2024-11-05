import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import styles from "./OrderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose, orderCount }) => {
  if (!order) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalTitleDetail}>
        <h2 style={{color: "#0f5eb3bd", fontWeight: "bold", marginBottom: "0px"}}>Order Details</h2>
        <CiDeliveryTruck />
        </div>
        <h3>Order ID: {orderCount + 1}</h3>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>
          Status:{" "}
          <span className={styles[order.status.toLowerCase()]}>
            {order.status}
          </span>
        </p>
        <p>
          Total Amount: <strong>${order.totalAmount.toFixed(2)}</strong>
        </p>
        <h4>Products:</h4>
        <div className={styles.productList}>
          {order.items.map((item) => (
            <div key={item._id} className={styles.productItem}>
              <img
                src={
                  item.productId.statimage
                    ? `http://localhost:5000/${item.productId.statimage}`
                    : `http://localhost:5000/${item.productId.image}`
                }
                alt={item.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h5>{item.name}</h5>
                <p>Category: {item.productId.category}</p>
                <p>Color: {item.productId.color}</p>
                <p>Quantity: x{item.quantity}</p>
                <p>
                  Price: <strong>${item.price.toFixed(2)}</strong>
                </p>
                <p className={styles.rating}>
                  Rating: {item.productId.rating} ({item.productId.reviewsCount} reviews)
                </p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
