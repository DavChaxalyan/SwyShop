import { combineReducers } from "redux";
import productReducer from "./productReducer";
import { authReducer } from "./authReducer";

// Комбинируем все редьюсеры в один корневой
const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;
