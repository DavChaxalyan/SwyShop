import axios from "axios";
import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_IN_CART,
  ADD_TO_FAVORITE_FAIL,
  ADD_TO_FAVORITE_SUCCESS,
  GET_PRODUCT_IN_FAVORITE,
  DELETE_PRODUCT_IN_FAVORITE_FAIL,
  GET_PRODUCT_IN_FAVORITE_FAIL,
} from "./types";

export const addProductInFavorite = (id, token) => async (dispatch) => {
    try {
      await axios.post(
        "https://swyshop.onrender.com/api/product/add/favorite",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedCartResponse = await axios.get(
        "https://swyshop.onrender.com/api/product/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const responseUpdated = await axios.get("https://swyshop.onrender.com/api/product/get");
      
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: responseUpdated.data });
      dispatch({ type: GET_PRODUCT_IN_CART, payload: updatedCartResponse.data });
      dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: id });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "Unknown error";
      dispatch({ type: ADD_TO_FAVORITE_FAIL, payload: errorMessage });
    }
  };
  
  export const deleteProductInFavorite = (id, token) => async (dispatch) => {
    try {
      const response = await axios.delete(
        "https://swyshop.onrender.com/api/product/delete-in-favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id },
        }
      );
  
      const updatedCartResponse = await axios.get(
        "https://swyshop.onrender.com/api/product/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const responseUpdated = await axios.get("https://swyshop.onrender.com/api/product/get");

      const responseFavorite = await axios.get(
        "https://swyshop.onrender.com/api/product/favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GET_PRODUCT_IN_FAVORITE, payload: responseFavorite.data });
      
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: responseUpdated.data });
      dispatch({ type: GET_PRODUCT_IN_CART, payload: updatedCartResponse.data });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unknown error";
      dispatch({ type: DELETE_PRODUCT_IN_FAVORITE_FAIL, payload: errorMessage });
    }
  };
  
  export const getProductInFavorite = (token) => async (dispatch) => {
    try {
      const response = await axios.get(
        "https://swyshop.onrender.com/api/product/favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GET_PRODUCT_IN_FAVORITE, payload: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unknown error";
      dispatch({ type: GET_PRODUCT_IN_FAVORITE_FAIL, payload: errorMessage });
    }
  };