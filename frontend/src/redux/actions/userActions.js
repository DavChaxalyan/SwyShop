import axios from "axios";
import { GET_USER_SUCCESS, GET_USER_FAIL } from "./types";

export const getUser = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/user/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Unknown error";
    dispatch({ type: GET_USER_FAIL, payload: errorMessage });
  }
};

export const putUser = (formDataEdit, token, id) => async (dispatch) => {
  try {
    await axios.put("http://localhost:5000/api/user/put", formDataEdit, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await axios.get(
      `http://localhost:5000/api/user/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
};
