import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART, ADD_NEW_PRODUCT } from './types';

export const addToCart = (productId) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: productId,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const addNewProduct = (product) => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: product,
  };
};