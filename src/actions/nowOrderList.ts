import { printingList } from '../utils/api';

export const NowOrder = (data) => {
    return {
      type: 'NOWORDER',
      data,
    };
  };

  export function asyncNoworder(payload) {
    return async dispatch => {
      const res = await printingList(payload);
      dispatch(NowOrder(res));
    };
  }
  