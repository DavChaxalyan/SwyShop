const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token);
            return { ...state, token: payload.token, isAuthenticated: true, loading: false };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            return { ...state, error: payload, isAuthenticated: false, loading: false };
        default:
            return state;
    }
};
