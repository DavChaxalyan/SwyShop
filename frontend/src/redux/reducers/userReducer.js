import { GET_USER_SUCCESS } from "../actions/types";

const initialState = {
  ProfileUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        ProfileUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
