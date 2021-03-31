import { call, put, takeLatest } from 'redux-saga/effects'
import {callAPI} from '../api/api';
import * as actions from '../action/app-actions';

function* fetchAPIData(action) {
   try {
        const graphData = yield call(callAPI, action.payload);
        yield put(actions.setAPIData(graphData));
   } catch (e) {
        console.log('Error in API', e);
   }
}

function* appSaga() {
  yield takeLatest('GET_API_DATA', fetchAPIData);
}

export default appSaga;