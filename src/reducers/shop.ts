const INITIAL_STATE = {};

export default function shopList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SHOP':
            return {
                ...state,
                shopList: action.data
            }
        default:
            return state;
    }
}