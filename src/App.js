import React, { useState, useEffect } from 'react';

import { searchLocation,
         fetchFiveDayForecast,
         searchGeoLocation,
         fetchCurrentConditions,
         fetchTopFifty,
         fetchHourlyForecast } from './actions/index';
import sweetError from './components/sweetError';
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
  const [ status, setStatus ] = useState(null);

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_ACCU_API_KEY);
    const handlePlacholder = () => {
      fetchTopFifty().promise.then(r => {
        console.log(r);
        let obj = r[Math.floor(Math.random() *50)];
        console.log(obj)
        handleForecasts(obj.Key);
        setForecastQuery(obj.LocalizedName);
      })
    }
    handlePlacholder()
  }, [])

  const handleForecasts = locationKey => {
    setStatus(0);
    fetchCurrentConditions(locationKey).promise.then(r => {
      console.log(r)
      if (r === undefined) return Promise.reject(sweetError('No result'))
      setCurrentConditions(r[0]);
      setStatus(status => status += 1);
    })
    fetchFiveDayForecast(locationKey).promise.then(r => {
      if (r === undefined) return Promise.reject(sweetError('No result'))
      setDayForecast(r.DailyForecasts[0]);
      setFutureForecast(r.DailyForecasts.slice(1, 5));
      setStatus(status => status += 1);
    })
    fetchHourlyForecast(locationKey).promise.then(r => {
      if (r === undefined) return Promise.reject(sweetError('No result'))
      setHourlyForecast(r);
      setStatus(status => status += 1);
    })
  }

  const handleSearch = value => {
    searchLocation(value).promise.then(r => {
      if (r) {
        try {
          setForecastQuery(value);
          handleForecasts(r[0].Key);
        } catch (error) {
          sweetError(`Error: Can't find ${error}`)
        }
      }
    })
  }

  const handleGeoLocation = crd => {
    searchGeoLocation(crd.latitude, crd.longitude).promise.then(r =>{
      if (r === undefined) return Promise.reject(sweetError('No result'))
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
