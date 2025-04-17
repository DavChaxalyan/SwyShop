import axios from "axios";
import { getUserIdFromToken } from "../../Utils/utils";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS, GET_PRODUCT_IN_CART } from "./types";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const transformedOrderData = {
      ...orderData,
      items: orderData.items.map((item) => ({
        ...item,
        productId: item.id || item._id,
        quantity:
          item.whoInCart.find(
            (user) => user.userId.toString() === getUserIdFromToken()
          )?.count || 1,
      })),
    };
    const response = await axios.post(
        "https://swyshop.onrender.com/api/order/create",
        transformedOrderData,
        config
    );

    const responseCart = await axios.get(
      "https://swyshop.onrender.com/api/product/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    dispatch({ type: GET_PRODUCT_IN_CART, payload: responseCart.data });
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response.data });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "https://swyshop.onrender.com/api/order/get",
      config
    );
    dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: error.response.data });
  }
};
