// frontend/src/redux/reducers/productReducer.js
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_FAVORITE_SUCCESS,
  GET_PRODUCT_IN_CART,
  GET_PRODUCT_IN_FAVORITE,
  GET_PRODUCT_SUCCESS,
  REMOVE_FROM_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  ADD_NEW_PRODUCT,
} from "../actions/types";
import products from "../../data/product";

const initialState = {
  items: products,
  cart: [],
  favorites: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
      };
    case GET_PRODUCT_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case GET_PRODUCT_IN_FAVORITE:
      return {
        ...state,
        favorites: [...action.payload],
      };
    case ADD_TO_CART_SUCCESS:
      const addedProduct = state.items.find(
        (item) => (item.id || item._id) === action.payload
      );
      const isProductInCart = state.cart.some(
        (item) => (item.id || item._id) === action.payload
      );
      if (isProductInCart) {
        return state;
      }
      const updatedProduct = { ...addedProduct, isInCart: true };
      return {
        ...state,
        items: state.items.map((item) =>
          (item.id || item._id) === action.payload ? updatedProduct : item
        ),
        cart: [...state.cart, updatedProduct],
      };
    case ADD_TO_FAVORITE_SUCCESS:
      const addedProductFavorite = state.items.find(
        (item) => (item.id || item._id) === action.payload
      );
      const isProductInFavorite = state.cart.some(
        (item) => (item.id || item._id) === action.payload
      );
      if (isProductInFavorite) {
        return state;
      }
      const updatedProductFavorite = {
        ...addedProductFavorite,
        isInCart: true,
      };
      return {
        ...state,
        items: state.items.map((item) =>
          (item.id || item._id) === action.payload
            ? updatedProductFavorite
            : item
        ),
        favorites: [...state.favorites, updatedProductFavorite],
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
          (item.id || item._id) === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.id || item._id) === action.payload && item.quantity > 1
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
        quantity: 1,
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
