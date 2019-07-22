import { feedBack } from '../utils/api';

export const feed = (data) => {
    return {
      type: 'FEEDBACK',
      data,
    };
  };

  export function asynFeedBack(payload) {
    return async dispatch => {
      const res = await feedBack(payload);
      dispatch(feed(res));
    };
  }
  