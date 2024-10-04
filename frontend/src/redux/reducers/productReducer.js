// frontend/src/redux/reducers/productReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";
import products from "../../data/product";
import { DECREMENT_QUANTITY } from "../actions/types";
import { INCREMENT_QUANTITY } from "../actions/types";
import { ADD_NEW_PRODUCT } from "../actions/types";

const initialState = {
  items: products,
  cart: [],
};

const productReducer = (state = initialState, action) => {
  console.log(state);

  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = state.items.find(
        (item) => item.id === action.payload
      );
      const isProductInCart = state.cart.some(
        (item) => item.id === action.payload
      );
      if (isProductInCart) {
        return state;
      }
      const updatedProduct = { ...addedProduct, isInCart: true };
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? updatedProduct : item
        ),
        cart: [...state.cart, updatedProduct],
      };
    case REMOVE_FROM_CART:
      const removedProduct = state.items.find(
        (item) => item.id === action.payload
      );
      const updatedRemovedProduct = { ...removedProduct, isInCart: false };

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? updatedRemovedProduct : item
        ),
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case ADD_NEW_PRODUCT:
      const newProduct = {
        ...action.payload,
        oldPrice: 349.99,
        rating: 3.5,
        reviewsCount: 12,
        id: state.items.length + 1,
        isInCart: false,
        quantity: 1
      };
      return {
        ...state,
        items: [...state.items, newProduct],
      };
    default:
      return state;
  }
};

export default productReducer;
