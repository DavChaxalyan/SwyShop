import { combineReducers } from "redux";
import productReducer from "./productReducer";
import { authReducer } from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  user: userReducer,
});

export default rootReducer;
