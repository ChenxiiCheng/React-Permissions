import actionTypes from '../action/actionTypes';

export default function UserReducer(preState = { list: [], total: 0 }, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_LIST:
      return action.payload;
    case actionTypes.ADD_USER:
      preState.list.shift(action.payload);
      preState.total += 1;
      return { ...preState };
    case actionTypes.EDIT_USER:
      let preUserIndex = preState.list.findIndex(
        (item) => item.id === action.payload.id
      );
      preState.list.splice(preUserIndex, 1, action.payload);
      return { ...preState };
    default:
      return preState;
  }
}
