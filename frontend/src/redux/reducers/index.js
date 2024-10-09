import { combineReducers } from "redux";
import productReducer from "./productReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;
