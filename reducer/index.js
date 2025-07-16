import { combineReducers } from 'redux';
import userDataReducer from "../slices/userData"
import loaderReducer from "../slices/loaderSlice"
const rootReducer = combineReducers({
  userData: userDataReducer,
  loader:loaderReducer 
});

export default rootReducer;
