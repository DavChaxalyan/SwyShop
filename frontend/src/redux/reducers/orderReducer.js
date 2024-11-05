import { CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS } from "../actions/types";

const initialState = {
    orders: [],
    loading: false,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          orders: [...state.orders, action.payload],
          loading: false,
        };
      case CREATE_ORDER_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case GET_ORDERS_SUCCESS:
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
      case GET_ORDERS_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  