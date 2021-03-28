import React from "react";
import { render, waitFor } from '@testing-library/react';

import addDay from '../utilities/addDay';
import App from '../App';

const mockAddDay = jest.fn(day => {
  addDay(day)
})

jest.mock('../actions/index', () => ({
  fetchTopFifty: () => {
    let promise = Promise.resolve(Array(50).fill({Key: '12345'}))
    return { promise }
  },
  fetchCurrentConditions: () => {
    let promise = Promise.resolve([{ WeatherText: 'sunny', RelativeHumidity: 30, WeatherIcon: 1, PrecipitationSummary: { Precipitation: { Metric: { Value: 1 } } }, Wind: { Speed: { Metric: { Value: 1 } } }, UVIndex: 3, RealFeelTemperature: { Metric: { Value: 1 } }, Temperature: { Metric: { Value: 1 } } }])
    return { promise }
  },
  fetchFiveDayForecast: () => {
    const date = new Date('2021-03-22T07:00:00+01:00')
    let promise = Promise.resolve({DailyForecasts: [{Day: {}, Night: {}, Date: date, Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: mockAddDay(date, 1), Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: mockAddDay(date, 2), Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: mockAddDay(date, 3), Temperature: { Maximum: {}, Minimum: {}}}]})
    return { promise }
  },
  fetchHourlyForecast: () => {
    const time = '2021-03-24T07:00:00+01:00';
    Array(12).fill({DateTime: time, Temperature: {}})
    let promise = Promise.resolve(Array(12).fill({DateTime: time, Temperature: {}}))
    return { promise }
  }
}))

describe('<App />', () => {
  test('renders components properly on successful api call', async () => {
    const { getByText, getByTitle, getAllByText } = render(<App />);

    //header
    getByText("JupitersLB Weather App");

    //footer
    getByTitle("Gmail");

    // dayForecastDetails
    await waitFor(() => getByText(/Now in/i));

    // dayForecastSimple and hourlyForecastSimple
    expect( await waitFor(() => getAllByText(/A look into the next few/i))).toHaveLength(2);

  });
})


