import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Named import
import rootReducer from './reducers'; // Adjust the path according to your structure

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Use thunk here
);

export default store;