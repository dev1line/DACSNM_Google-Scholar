import { queryReducer } from './common/reducers'
const { combineReducers } = require('redux')
const rootReducer = combineReducers({
  query: queryReducer
})

export default rootReducer
