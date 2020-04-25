import actionTypes from './actionTypes';
import { loadPerList, addPer, editPer, deletePer } from '../service';

// 同步
export function LoadPer(payload) {
  return {
    type: actionTypes.LOAD_PER_LIST,
    payload,
  };
}

// 异步
export function LoadPerAsync(params) {
  return (dispatch) => {
    return loadPerList(params).then((res) => {
      const payload = {
        list: res.data,
        total: parseInt(res.headers['x-total-count']),
      };
      dispatch(LoadPer(payload));
    });
  };
}

export function AddPer(payload) {
  return {
    type: actionTypes.ADD_PER,
    payload,
  };
}

export function AddPerAsync(per) {
  return (dispatch) => {
    return addPer(per).then((res) => {
      dispatch(AddPer(res.data));
    });
  };
}

export function EditPer(payload) {
  return {
    type: actionTypes.EDIT_PER,
    payload,
  };
}

export function EditPerAsync(per) {
  return (dispatch) => {
    return editPer(per).then((res) => {
      dispatch(EditPer(res.data));
    });
  };
}

export function DeletePer(ids) {
  return {
    type: actionTypes.DELETE_PER_IDS,
    payload: ids,
  };
}

export function DeletePerAsync(ids) {
  return (dispatch) => {
    return deletePer(ids).then((res) => {
      dispatch(DeletePer(ids));
    });
  };
}
