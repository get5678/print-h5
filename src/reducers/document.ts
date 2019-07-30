const INITIAL_STATE = { };

export default function documentList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'DOCUMENT':
            return {
                ...state,
                documentList: action.data
            };
        case 'GROUP':
            return {
                ...state,
                groupPrice : action.data
            };
        case 'PRINT':
            return {
                ...state,
                wxpay: action.data
            };
        case 'PAYID':
            return {
                ...state,
                payid: action.data
            }
        default:
            return state;
    }
}