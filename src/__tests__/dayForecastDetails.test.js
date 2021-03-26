import React from "react";
import { render } from '@testing-library/react';

import DayForecastDetails from '../components/dayForecastDetails';

jest.mock('../utilities/bundleLoader', () => ({
  importFiles: () => {
    return ['cat', 'dog']
  },
  loadImage: (images, imageName) => {
    return "./src/assets/images/cat.png"
  }
}))

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

});
