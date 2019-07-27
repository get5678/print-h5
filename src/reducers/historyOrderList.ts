const INITIAL_STATE = {
    data:{}
  }
export default function historyOrderList (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case 'HISTORYORDER':
      return {
        data: actions.data
      };
    case 'TOSURE':
      return {
        data: actions.data
      };
    default:
      return state;
  }
}
