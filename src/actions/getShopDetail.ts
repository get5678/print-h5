import { getShopDetail } from '../utils/api';

export const shopGet = (data) => {
    return {
      type: 'GET',
      data,
    };
  };

  export function asyncShopGet(payload) {
    return async dispatch => {
      const res = await getShopDetail(payload);
      dispatch(shopGet(res));
    };
  }
  