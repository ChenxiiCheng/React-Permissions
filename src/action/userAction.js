import actionTypes from './actionTypes';
import { loadUserList, addUser, updateUser } from '../service';

// 同步
export function LoadUserAction(payload) {
  return {
    type: actionTypes.LOAD_USER_LIST,
    payload,
  };
}

// redux-thunk用法: 异步
export function LoadUserActionAsync(params) {
  return (dispatch) => {
    return loadUserList(params).then((res) => {
      let total = parseInt(res.headers['x-total-count']);
      dispatch(LoadUserAction({ list: res.data, total }));
    });
  };
}

export function AddUserAction(payload) {
  return {
    type: actionTypes.ADD_USER,
    payload,
  };
}

export function AddUserActionAsync(payload) {
  return (dispatch) => {
    return addUser(payload).then((res) => {
      dispatch(AddUserAction(res.data));
    });
  };
}

export function EditUserAction(payload) {
  return {
    type: actionTypes.EDIT_USER,
    payload,
  };
}

export function EditUserActionAsync(payload) {
  return (dispatch) => {
    return updateUser(payload).then((res) => {
      dispatch(EditUserAction(res.data));
    });
  };
}
