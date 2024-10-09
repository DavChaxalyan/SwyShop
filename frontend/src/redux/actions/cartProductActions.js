import axios from "axios";
import {
  GET_PRODUCT_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  GET_PRODUCT_IN_CART,
  GET_PRODUCT_IN_CART_FAIL,
  DELETE_PRODUCT_IN_CART_FAIL,
} from "./types";

export const addProductInCart = (id, token) => async (dispatch) => {
    try {
      await axios.post(
        "http://localhost:5000/api/product/post",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const responseUpdated = await axios.get("http://localhost:5000/api/product/get");
      
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: id });
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: responseUpdated.data });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "Unknown error";
      dispatch({ type: ADD_TO_CART_FAIL, payload: errorMessage });
    }
  };
  
  export const getProductInCart = (token) => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GET_PRODUCT_IN_CART, payload: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unknown error";
      dispatch({ type: GET_PRODUCT_IN_CART_FAIL, payload: errorMessage });
    }
  };
  
  export const deleteProductInCart = (id, token) => async (dispatch) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/product/delete-in-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        }
      );
  
      const updatedCartResponse = await axios.get(
        "http://localhost:5000/api/product/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GET_PRODUCT_IN_CART, payload: updatedCartResponse.data });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unknown error";
      dispatch({ type: DELETE_PRODUCT_IN_CART_FAIL, payload: errorMessage });
    }
  };