import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserOrders.module.css";
import { getOrders } from "../../redux/actions/orderActions";
import OrderDetailsModal from "./OrderDetailsModal";
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { TbTruckDelivery } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const UserOrders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
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
        <h1>{t("orders-page-title")}</h1>
        <TbTruckDelivery />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.mainTableBlock}>
            <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>{t("orders-page-subtitle1")} ID</th>
              <th>{t("orders-page-subtitle2")}</th>
              <th>{t("orders-page-subtitle3")}</th>
              <th>{t("orders-page-subtitle4")}</th>
              <th>{t("orders-page-subtitle5")}</th>
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
                <td>{formatCurrency(priceFix(currency, order.totalAmount, exchangeRates), currency)}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} (x{item.quantity}) - 
                        {formatCurrency(priceFix(currency, item.price, exchangeRates), currency)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
        </div>
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
