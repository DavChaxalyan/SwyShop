import axios from 'axios';
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types';

export const register = (formData) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        
        dispatch({ type: REGISTER_SUCCESS, payload: formData });
        dispatch({ type: REGISTER_FAIL, payload: '' });
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

export const verifyEmail = (email, code) => async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-email", { email, code });
      const { token, userId } = response.data;
      
      localStorage.setItem('token', token);
      
      dispatch({ type: "EMAIL_VERIFIED_SUCCESS", payload: { userId } });
    } catch (error) {
      dispatch({ type: "EMAIL_VERIFIED_FAIL", payload: error.response.data.message });
    }
  };

  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
  
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
  
      dispatch({
        type: "FORGOT_PASSWORD_SUCCESS",
        payload: response.data.message,
      });
  
      alert(response.data.message);
    } catch (error) {
      dispatch({
        type: "FORGOT_PASSWORD_FAIL",
        payload: error.response ? error.response.data.message : error.message,
      });
  
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  export const resetPassword = ({ token, password }) => async (dispatch) => {
    try {
      dispatch({ type: "RESET_PASSWORD_REQUEST" });
  
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
  
      dispatch({
        type: "RESET_PASSWORD_SUCCESS",
        payload: response.data.message,
      });
      alert(response.data.message); 
      return response.data;
    } catch (error) {
      dispatch({
        type: "RESET_PASSWORD_FAIL",
        payload: error.response ? error.response.data.message : error.message,
      });
  
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  export const changePassword = ( form ) => async (dispatch) => {
    const currentPassword = form.currentPassword
    const newPassword = form.newPassword
    const userId = form.userId

    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:5000/api/auth/change-password', {
            currentPassword,
            newPassword,
            userId
        }, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
  
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
      alert(response.data.message); 
      setTimeout(() => {
        localStorage.removeItem('token')
        window.location.reload();
      }, 500)
      return response.data;
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
  
      alert(error.response ? error.response.data.message : error.message);
    }
  };