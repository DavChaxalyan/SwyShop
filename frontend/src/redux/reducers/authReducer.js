const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
  emailSent: false,
  error: null,
  email: null,
};

export const authReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch (type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        emailSent: true,
        loading: false,
        email: payload.email,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
      };
    case "EMAIL_VERIFIED_SUCCESS":
      return {
        ...state,
        emailSent: false,
      };
    case "EMAIL_VERIFIED_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "FORGOT_PASSWORD_REQUEST":
      return { ...state, loading: true };
    case "FORGOT_PASSWORD_SUCCESS":
      return { ...state, loading: false, message: action.payload };
    case "FORGOT_PASSWORD_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
