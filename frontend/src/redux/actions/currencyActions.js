import axios from "axios";

export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setCurrency = (currency) => {
    return (dispatch) => {
      dispatch({
        type: SET_CURRENCY,
        payload: currency
      });
  
      localStorage.setItem('currency', currency);
    };
  };

export const setExchangeRates = (rates) => ({
  type: SET_EXCHANGE_RATES,
  payload: rates,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const fetchExchangeRates = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      
      dispatch(setExchangeRates(response.data.rates));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Error fetching exchange rates.'));
      dispatch(setLoading(false));
    }
  };
};
