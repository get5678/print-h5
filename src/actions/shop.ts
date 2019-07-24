import { shopList } from '../utils/api'

export const getShopList = data => {
    return {
        type: 'SHOP',
        data,
    }
}

export function asyncGetShopList(payload) {
    return async dispatch => {
        const res = await shopList(payload);
        dispatch(getShopList(res));
    }
}