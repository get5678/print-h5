import { orderDetail } from '../utils/api';

export const getOrderDetail = (data) => {
    return {
      type: 'ORDERDETAIL',
      data,
    };
  };

  export function asyncorderDetail(payload) {
    return async dispatch => {
      const res = await orderDetail(payload);
      dispatch(getOrderDetail(res));
    };
  }
  