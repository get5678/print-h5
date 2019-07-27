const INITIAL_STATE = {
    data:{}
  }
export default function nowOrderList (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case 'NOWORDER':
      return {
        data: actions.data
      };
      case 'NOWTOSURE':
        return {
          data: actions.data
        };
    default:
      return state;
  }
}
