import axios from "axios";
import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  MY_PRODUCTS_FAIL,
  PUT_PRODUCT_REQUEST,
  PUT_PRODUCT_SUCCESS,
  PUT_PRODUCT_FAILURE,
} from "./types";

export const addProduct = (formData, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/product/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response
      ? error.response.data.message
      : "Unknown error";
    dispatch({ type: ADD_PRODUCT_FAIL, payload: errorMessage });
  }
};

export const getProduct = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/product/get");

    dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Unknown error";
    dispatch({ type: GET_PRODUCT_FAIL, payload: errorMessage });
  }
};

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => {
  return async (dispatch) => {
      dispatch(fetchProductsRequest());
      try {
          const { data } = await axios.get('http://localhost:5000/api/product/get/all');
          dispatch(fetchProductsSuccess(data));
      } catch (error) {
          dispatch(fetchProductsFailure(error.message));
      }
  };
};

export const getMyProducts = () => async (dispatch) => {
  try {
    dispatch({ type: MY_PRODUCTS_REQUEST });
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/product/my-products', config); 

    dispatch({ type: MY_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const putProduct = (formData, token) => async (dispatch) => {
  try {
      dispatch({ type: PUT_PRODUCT_REQUEST });

      const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
      };

      const response = await axios.put('http://localhost:5000/api/product/put-product', formData, config);
      
      dispatch({ type: PUT_PRODUCT_SUCCESS, payload: response.data });
      return response.data; 
  } catch (error) {
      dispatch({ type: PUT_PRODUCT_FAILURE, payload: error.response?.data || error.message });
      throw error; 
  }
};