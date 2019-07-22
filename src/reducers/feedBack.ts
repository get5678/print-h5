const INITIAL_STATE = {
    data:{}
  }
export default function feedBack (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case 'FEEDBACK':
      return {
        data: actions.data
      };
    default:
      return state;
  }
}
