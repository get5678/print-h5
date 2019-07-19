import {documentList} from '../utils/api'

export const getDocumentList = data => {
    return {
        type: 'LIST',
        data: data.documentDTOList
    }
}

export async function asyncGetDocumentList(payload) {
    return async dispatch => {
        const res = await documentList(payload);
        dispatch(getDocumentList(res));
    }
}
