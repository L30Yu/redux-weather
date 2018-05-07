import React from 'react';
import { Col, Card, CardTitle, CardText, CardBody } from 'reactstrap';

const ForeCast = ({ date, temp, weather }) => (
    <Col style={{paddingLeft: "3rem", paddingTop: "0.5rem"}}>
            <Card style={{width: "17rem"}}>
                <CardBody>
                    <CardTitle>{date}</CardTitle>
                    <h4>Temperature:</h4>
                    <CardText> {temp.join(' => ')}</CardText>
                    <h4>Weather:</h4>
                    <p>{weather.join(' => ')}</p>
                </CardBody>
            </Card>        
    </Col >
);

export default ForeCast;