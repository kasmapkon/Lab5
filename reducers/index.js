// index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // ...add other reducers here if needed
});

export default rootReducer;
