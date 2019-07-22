import { combineReducers } from 'redux'
import counter from './counter'
import getShopDetail from './getShopDetail'
import orderDetail from './orderDetail'
import feedBack from './feedBack'
import historyOrderList from './historyOrderList';
import nowOrderList from './nowOrderList';

export default combineReducers({
  counter,
  getShopDetail,
  orderDetail,
  feedBack,
  nowOrderList,
  historyOrderList
})
