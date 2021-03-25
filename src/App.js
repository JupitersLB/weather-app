import React, { useState, useEffect } from 'react';
import { searchLocation,
         fetchFiveDayForecast,
         searchGeoLocation,
         fetchCurrentConditions,
         fetchTopFifty,
         fetchHourlyForecast,
         sweetError } from './actions/index';
import Header from './components/header';
import DayForecastDetails from './components/dayForecastDetails';
import ForecastList from './components/forecastList';
import Footer from './components/footer';


import './App.css';

function App() {

  const [ currentConditions, setCurrentConditions ] = useState({});
  const [ hourlyForecast, setHourlyForecast ] = useState('');
  const [ dayForecast, setDayForecast ] = useState({});
  const [ futureForecast, setFutureForecast ] = useState([]);
  const [ forecastQuery, setForecastQuery ] = useState('');
  const [ status, setStatus ] = useState();

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_ACCU_API_KEY);
    fetchTopFifty().promise.then(r => {
      if (r) {
        let obj = r[Math.floor(Math.random() *50)];
        handleForecasts(obj.Key);
        setForecastQuery(obj.LocalizedName);
      }
    })
  }, [])

  const handleForecasts = locationKey => {
    setStatus(0);
    fetchCurrentConditions(locationKey).promise.then(r =>{
      setCurrentConditions(r[0]);
      setStatus(status => status += 1);
    })
    fetchFiveDayForecast(locationKey).promise.then(r =>{
      setDayForecast(r.DailyForecasts[0]);
      setFutureForecast(r.DailyForecasts.slice(1, 5));
      setStatus(status => status += 1);
    })
    fetchHourlyForecast(locationKey).promise.then(r => {
      setHourlyForecast(r);
      setStatus(status => status += 1);
    })

  }

  const handleSearch = value => {
    searchLocation(value).promise.then(r => {
      if (r.length > 1) {
        setForecastQuery(value);
        handleForecasts(r[0].Key);
      } else {
        sweetError(`Error: Can't find ${value}`)
      }
    })
  }

  const handleGeoLocation = crd => {
    searchGeoLocation(crd.latitude, crd.longitude).promise.then(r =>{
      setForecastQuery(r.LocalizedName);
      handleForecasts(r.Key);
    })
  }

  return (
    <div className="App flex flex-col">
      <Header handleGeoLocation={handleGeoLocation} handleSearch={handleSearch} />
      <div className="forecasts flex-grow">
        <div className="day-forecast">
          {status === 3 ? <DayForecastDetails query={forecastQuery} current={currentConditions} forecast={dayForecast} /> : ''}
        </div>
        <div className="hourly-forecast pt-3">
          {status === 3 ? <ForecastList forecast={hourlyForecast} type="hours" /> : ''}
        </div>
        <div className="future-forecast pt-3">
          {status === 3 ? <ForecastList forecast={futureForecast} type="days" /> : ''}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
