import React from 'react';
import { Jumbotron } from 'reactstrap';
import tz from 'tz-lookup';

const Weather = ({ temp, city, weather, pressure, urlForIcon, isFetching, coord }) => {
    let timezone = coord ? tz(coord.lat, coord.lon) : null;
    return (
    <div>
        <Jumbotron>
            {   
                isFetching 
                ? <p>Loading...</p>
                : null    
            }
            <h4 className="display-4">{city}</h4>
            <p className="lead">Temperature: {temp}&deg;</p>
            <p className="lead">
                Weather: {weather}
                {
                    temp && city
                    ? <img src={urlForIcon} alt="" />
                    : null
                }
            </p>

            {coord 
                ? 
                <p>TimeZone: {(timezone)}</p>             
                : null
            }
            
        </Jumbotron>
     </div >
 )};

export default Weather;