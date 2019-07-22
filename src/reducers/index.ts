import { combineReducers } from 'redux'
import counter from './counter'
<<<<<<< HEAD
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
=======
import document from './document'

export default combineReducers({
  counter,
  document
>>>>>>> 78b879f65d88ca987c88ac9fe76656440c765781
})
