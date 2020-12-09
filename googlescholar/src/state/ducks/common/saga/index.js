import { all, takeLatest } from 'redux-saga/effects'
import { getQuery } from './querySaga'
function * rootSaga () {
  yield all([takeLatest('GET_QUERY', getQuery)])
}
export default rootSaga
