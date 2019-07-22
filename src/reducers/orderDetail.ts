const INITIAL_STATE = {
    data:{}
  }
export default function orderDetail (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case 'ORDERDETAIL':
      return {
        data: actions.data
      };
    default:
      return state;
  }
}
