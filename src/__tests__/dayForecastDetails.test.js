import React from "react";
import { render } from '@testing-library/react';
// import api from '../__mocks__/api'

import DayForecastDetails from '../components/dayForecastDetails';

// const myMock = jest.mock('../actions/index', () => ({
//   __esModule: true,
//   searchLocation: 'searchLocation',
//   fetchFiveDayForecast: 'fetchFiveDayForecast',
//   fetchCurrentConditions: 'fetchCurrentConditions',
//   fetchHourlyForecast: 'fetchHourlyForecast',
// }));

jest.mock('../__mocks__/api', (() => {
  getCurrent: jest.fn()
}));

// const mockGetCurrent = (api.getCurrent = jest.fn())

// mockGetCurrent.mockResolvedValueOnce({name: 'test'});

getCurrent.mockImplementation()

jest.mock('../components/bundle-loader', () => ({
  importFiles: () => {
    return ['cat', 'dog']
  },
  loadImage: (images, imageName) => {
    return "./src/assets/images/cat.png"
  }
}))

// const myMock = jest.fn()

// console.log(myMock.mock.searchLocation())

const forecastQuery = 'Tokyo'
const currentConditions = { WeatherText: 'sunny', RelativeHumidity: 30, WeatherIcon: 1, PrecipitationSummary: { Precipitation: { Metric: { Value: 1 } } }, Wind: { Speed: { Metric: { Value: 1 } } }, UVIndex: 3, RealFeelTemperature: { Metric: { Value: 1 } }, Temperature: { Metric: { Value: 1 } } }
const dayForecast = { Day: {}, Night: {} }

const childProps = {
  forecastQuery,
  ...currentConditions,
  ...dayForecast
}

test('<DayForecastDetails />', () => {
  const { getByText } = render( <DayForecastDetails {...childProps} />);

  getByText('sunny');

  expect(mockGetCurrent).toBeCalledTimes(1);

});
