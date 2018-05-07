import { select, put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionsTypes';
import { receiveWeatherSuccess, receiveWeatherFail, fetchWeather, fetchForecast } from './actions'

function* fetchWeatherInYourLocation() {
    try {
        const city = yield select(({ weather }) => weather.city);        
        const weather = yield call(fetchWeather, city);            
        const forecast = yield call(fetchForecast, city);  
        weather.forecast = forecast;  
        if(weather.cod === 200 || weather.id){
            yield put(receiveWeatherSuccess(weather))
        }
        yield put(receiveWeatherFail(weather))
    } catch (e) {
        yield put(receiveWeatherFail);
    }
}

export function* watch() {
    yield takeEvery(actionTypes.SET_LOCATION, fetchWeatherInYourLocation);
}

export default function* rootSaga() {
    yield watch();
}
