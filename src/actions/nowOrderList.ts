import { printingList,Tosure } from '../utils/api';

export const NowOrder = (data) => {
    return {
      type: 'NOWORDER',
      data,
    };
  };

  export const NowToSure = (data) => {
    return {
      type: 'NOWTOSURE',
      data,
    };
  };

  export function asyncNoworder(payload) {
    return async dispatch => {
      const res = await printingList(payload);
      dispatch(NowOrder(res));
    };
  }

  export function asyncNowToSure(payload) {
    return async dispatch => {
      const res = await Tosure(payload);
      dispatch(NowToSure(res));
    };
  }
  