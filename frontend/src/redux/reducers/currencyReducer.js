import { SET_CURRENCY, SET_EXCHANGE_RATES, SET_LOADING, SET_ERROR } from '../actions/currencyActions';

const initialState = {
  currency: localStorage.getItem('currency') || 'USD', 
  exchangeRates: {},
  loading: false,
  error: null,
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case SET_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currencyReducer;
