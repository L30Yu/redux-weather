import * as actionTypes from './actionsTypes';

export const setLocation = (city) => ({
    type: actionTypes.SET_LOCATION,
    city,
});

export const receiveWeatherSuccess = (data) => ({
    type: actionTypes.RECEIVE_WEATHER_SUCCESS,
    data,
});

export const receiveWeatherFail = (data) => ({
    type: actionTypes.RECEIVE_WEATHER_FAIL,
});

export const fetchWeather = (city) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?appid=52e111f544d1944b89e0650f8207e540&q=${city}&units=metric`)
        .then(data => data.json())        
        .catch(error => alert(error));
};


export const fetchForecast = (city) => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=52e111f544d1944b89e0650f8207e540&q=${city}&units=metric`)
        .then(data => data.json())
        .catch(error => alert(error));
};
