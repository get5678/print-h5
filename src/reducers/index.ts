import { combineReducers } from 'redux'
import counter from './counter'
import document from './document'

export default combineReducers({
  counter,
  document
})
