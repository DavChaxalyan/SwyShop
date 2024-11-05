import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserOrders.module.css";
import { getOrders } from "../../redux/actions/orderActions";
import OrderDetailsModal from "./OrderDetailsModal";
import { getUserIdFromToken } from "../../Utils/utils";
import { TbTruckDelivery } from "react-icons/tb";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const userOrders = orders?.filter(
    (order) => order.customerId === getUserIdFromToken()
  );
  const [loading, setLoading] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getOrders());
      setLoading(false);
    };

    fetchOrders();
  }, [dispatch]);

  const handleOrderClick = (order, ind) => {
    setSelectedOrder(order);
    setOrderCount(ind);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className={styles.orderPage}>
      <div className={styles.orderBlockTitle}>
        <h1>Your Orders</h1>
        <TbTruckDelivery />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order, ind) => (
              <tr
                key={order._id}
                onClick={() => handleOrderClick(order, ind)}
                className={styles.orderRow}
              >
                <td>{ind + 1}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={styles[order.status.toLowerCase()]}>
                  {order.status}
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} (x{item.quantity}) - $
                        {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeModal}
          orderCount={orderCount}
        />
      )}
    </div>
  );
};

export default UserOrders;
