import { documentList, groupPrice} from '../utils/api'

export const getDocumentList = data => {
    return {
        type: 'DOCUMENT',
        data,
    }
}
export const getGroupPrice = data => {
    return {
        type: 'GROUP',
        data,
    }
}


export function asyncGetDocumentList(payload) {
    return async dispatch => {
        const res = await documentList(payload).catch( err => console.log("err",err));
        console.log("res:",res)
        dispatch(getDocumentList(res));
    }
}
export function asyncGetGroupPrice(payload) {
    return async dispatch => {
        const res = await groupPrice(payload);
        dispatch(getGroupPrice(res));
    }
}
