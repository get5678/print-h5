import { myOrderList } from '../utils/api';

export const HistoryOrder = (data) => {
    return {
      type: 'HISTORYORDER',
      data,
    };
  };

  export function asyncHistoryOrder(payload) {
    return async dispatch => {
      const res = await myOrderList(payload);
      dispatch(HistoryOrder(res));
    };
  }
  