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
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  INCREASE_COUNT_REQUEST,
  DECREASE_COUNT_REQUEST,
  INCREASE_COUNT_SUCCESS,
  DECREASE_COUNT_SUCCESS,
  INCREASE_COUNT_FAIL,
  DECREASE_COUNT_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  MY_PRODUCTS_FAIL,
} from "../actions/types";

const initialState = {
  loading: false,
  error: "",
  items: [],
  cart: [],
  favorites: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PRODUCTS_REQUEST:
      return { loading: true, ...state, products: [] };
    case MY_PRODUCTS_SUCCESS:
      return { loading: false, ...state, products: action.payload };
    case MY_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    case INCREASE_COUNT_REQUEST:
    case DECREASE_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INCREASE_COUNT_SUCCESS:
    case DECREASE_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case INCREASE_COUNT_FAIL:
    case DECREASE_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
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
      const isProductInCart = state?.cart?.some(
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
      const isProductInFavorite = state?.cart?.some(
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
