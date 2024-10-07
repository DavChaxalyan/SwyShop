import axios from 'axios';
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL } from './types';

export const addProduct = (formData, token) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/add', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error); // Вывод ошибки на консоль
        const errorMessage = error.response ? error.response.data.message : 'Unknown error';
        dispatch({ type: ADD_PRODUCT_FAIL, payload: errorMessage });
    }
};