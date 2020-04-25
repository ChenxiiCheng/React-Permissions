import actionTypes from '../action/actionTypes';

export default function UserReducer(preState = { list: [], total: 0 }, action) {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.LOAD_PER_LIST:
      return action.payload;
    case actionTypes.ADD_PER:
      newState.list.unshift(action.payload);
      newState.total += 1;
      return newState;
    case actionTypes.EDIT_PER:
      let editPerIndex = newState.list.findIndex(
        (item) => item.id === action.payload.id
      );
      newState.list.splice(editPerIndex, 1, action.payload);
      return newState;
    case actionTypes.DELETE_PER_IDS:
      newState.list = newState.list.filter(
        (item) => !action.payload.includes(item.id)
      );
      newState.total = newState.total - action.payload.length;
      return newState;
    default:
      return preState;
  }
}
