import React, { Component } from 'react';
import axios from 'axios';
import nextSevenDays from '../util';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default class DashboardIndex extends Component {
  state = {
    weather: {},
    isLoaded: false,
  }

  componentDidMount = async() => {
    if (this.props.user.city) {
      try {
        const geolocResponse =
          await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.props.user.city}&key=${process.env.REACT_APP_GEOLOC_API}`);
        const { lat, lng } = geolocResponse.data.results[0]?.geometry;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API}`);
        await this.setState({
          weather: weatherResponse.data,
          isLoaded: true
        });
      } catch(err) {
        console.log(err);
      }
    };
  }

  render() {
    const { current, daily } = this.state.weather;
    daily?.shift();
    const currentDate = new Date();
    const nextWeek = nextSevenDays(currentDate).map(date => date.toDateString());

    return (
      <Container fluid>
        <Row>
          <h4>Welcome, {this.props.user.username}!{this.props.user.__t === "Farmer"? '🧑‍🌾' : '🧑‍🔧'}</h4>
        </Row>
        {this.state.isLoaded?
        <>
          <Row>
            <h5>{currentDate.toDateString()}</h5>
          </Row>
          <Row>
            <Col className="current-weather-des">
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}/>
                <h6>{current.weather[0].description}</h6>
            </Col>
            <Col>
              <strong>Temperature (°C)</strong>
              <p>{Math.round(current.temp)}</p>
              <strong>Feel like (°C)</strong>
              <p>{Math.round(current.feels_like)}</p>
              <strong>Humidity</strong>
              <p>{current.humidity}</p>
            </Col>
            <Col>
              <strong>Clouds</strong>
              <p>{current.clouds}</p>
              <strong>Wind (°)</strong>
              <p>{current.wind_deg}</p>
              <strong>Wind (m/s)</strong>
              <p>{current.wind_speed}</p>
            </Col>
          </Row>
          <Row>
            <Table responsive>
              <thead>
                <tr>
                  {nextWeek.map((day, i) => <th key={i}>{day}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daily.map(day => <td key={day.dt}><img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='weather icon'/></td>)}
                </tr>
                <tr>
                  {daily.map(day => <td key={`temp of ${day.dt}`}>{Math.round(day.temp.min)} ~ {Math.round(day.temp.max)} °C</td>)}
                </tr>
                <tr>
                  {daily.map(day => <td key={`cloud of ${day.dt}`}>{day.clouds} ☁️</td>)}
                </tr>
                <tr>
                  {daily.map(day => <td key={`wind of ${day.dt}`}>{Math.round(day.wind_speed)}m/s🌬️</td>)}
                </tr>
              </tbody>
            </Table>
          </Row>
        </>
        :
        <Row>
          <p>Loading...</p>
        </Row>
        }
      </Container>
    )
  }
}
