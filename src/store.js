import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/saga';
import {combineReducers} from 'redux';
import  weather from './sagas/reducerSaga'

const rootReducer = combineReducers({weather});

const sagaMiddleware = createSagaMiddleware();

export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);