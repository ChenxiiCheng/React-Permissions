import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import PerReducer from './perReducer';

export default combineReducers({
  userList: UserReducer,
  perList: PerReducer,
});
