import { myOrderList, Tosure } from '../utils/api';

export const HistoryOrder = (data) => {
    return {
      type: 'HISTORYORDER',
      data,
    };
  };

  export const OrderSure = (data) => {
    return {
      type: 'TOSURE',
      data,
    };
  };

  export function asyncHistoryOrder(payload) {
    return async dispatch => {
      const res = await myOrderList(payload);
      dispatch(HistoryOrder(res));
    };
  }

  export function asyncTosure(payload) {
    return async dispatch => {
      console.log(payload)
      const res = await Tosure(payload);
      dispatch(OrderSure(res));
    };
  }
  