import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Weather from './Weather/Weather';
import ForeCast from './Weather/ForeCast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLocation } from '../sagas/actions';
import formatDays from '../utils/formatDays';

class App extends Component {

    state = {
        value: ''
    };

    onInputChange = (e) => this.setState({ value: e.target.value });

    clearInput = () => this.setState({ value: '' });

    onEnter = (e) => {
        const { actions } = this.props;
        const { value } = this.state;
        if (!!value.trim() && e.keyCode === 13) {
            actions.setLocation(value);
            this.clearInput();
        }
    };

    render() {
        const { isFetching } = this.props.weather;
        const { city, temp, weather, pressure, icon, forecast: forecastData, coord } = this.props.weather.weatherInfo;
        let fiveDays = null;
        if(forecastData && forecastData.list && coord){
            fiveDays = formatDays(forecastData.list, coord);
        }
        const { value } = this.state;
        const urlForIcon = `http://openweathermap.org/img/w/${icon}.png`;
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <Input type="text"
                                placeholder={'Enter City Name'}

                                onChange={this.onInputChange}
                                onKeyDown={this.onEnter}
                                value={value}
                                maxLength={'450px'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <Weather
                                city={city}
                                temp={temp}
                                weather={weather}
                                pressure={pressure}
                                urlForIcon={urlForIcon}
                                isFetching={isFetching}
                                coord={coord}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <Row>                        
                        {
                            fiveDays
                                ? 
                                Object.keys(fiveDays)
                                .map((value) =>
                                    <ForeCast
                                        key={value}
                                        date={value}
                                        temp={fiveDays[value].temp}
                                        weather={fiveDays[value].weather}
                                    />
                                )
                                : null
                        }                        
                    </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                setLocation
            },
            dispatch,
        ),
    };
};

const mapStateToProps = state => {
    return {
        weather: state.weather,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);