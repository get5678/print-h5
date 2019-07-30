import { documentList, groupPrice, wxpayPrint, payorderId} from '../utils/api'

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
// 打印
export const getwxpayPrice = data => {
    return {
        type: 'PRINT',
        data,
    }
}
// 订单号码
export const getpayOrderId = data => {
    return {
        type: 'PAYID',
        data,
    }
}

export function asyncGetDocumentList(payload) {
    return async dispatch => {
        const res = await documentList(payload).catch( err => console.log("err",err));
        dispatch(getDocumentList(res));
    }
}
export function asyncGetGroupPrice(payload) {
    return async dispatch => {
        const res = await groupPrice(payload);
        dispatch(getGroupPrice(res));
    }
}
export function asyncGetwxpayPrrint(payload) {
    
    const params = 
                `<xml>
                <out_trade_no>33d2d57e2281450ebd9d6133c89b4619</out_trade_no>
                <return_code>SUCCESS</return_code>
                <total_fee>1</total_fee>
                </xml>`;
    
    return async dispatch => {
        const res = await wxpayPrint(params, 'application/xml').catch((err) => console.log("printERR:",err));
        console.log("res",res)
        dispatch(getwxpayPrice(res));
    }
}
export function asyncGetpayorderId(payload) {
    return async dispatch => {
        const res = await payorderId(payload).catch((err) => console.log("orderERR",err));
        dispatch(getpayOrderId(res));
    }
}