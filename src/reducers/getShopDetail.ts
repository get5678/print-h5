const INITIAL_STATE = {
    data:{}
  }
export default function getShopDetail (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case 'GET':
      return {
        data: actions.data
      };
    default:
      return state;
  }
}
