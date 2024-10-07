import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types';

export const register = (formData) => async (dispatch) => {
    console.log(formData);
    
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', formData);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch({ type: REGISTER_FAIL, payload: '' });
        console.log(res);
        
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
};

export const login = (formData) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};
