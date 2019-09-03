import * as actionTypes from '../constants/actionTypes';
import TableConfig from '../constants/tableSettings';

const TableSettings = TableConfig;

const TableDatas = (state = TableSettings, action) => {
  debugger;
  switch (action.type) {
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        userData: [...state.userData, action.user]
      };
    case actionTypes.DELETE_USER:
      const _datas = [...state.userData];
      const _userData = _datas && _datas.length && _datas.filter(_data => _data.key !== action.userId)
      return {
        ...state,
        userData: _userData
      };
    case actionTypes.UPDATE_USER:
      debugger;
      return {
        ...state,
        userData: action.users
      };
    default:
      return state
  }
}

export default TableDatas;