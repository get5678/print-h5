const INITIAL_STATE = {};

export default function document(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LIST':
            return {
                ...state,
                documentList: action.data
            };
            
        default:
            return state;
    }
}