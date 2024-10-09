import axios from "axios";
import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
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