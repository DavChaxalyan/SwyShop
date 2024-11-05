import { combineReducers } from "redux";
import productReducer from "./productReducer";
import { authReducer } from "./authReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  user: userReducer,
  order: orderReducer,
});

export default rootReducer;
