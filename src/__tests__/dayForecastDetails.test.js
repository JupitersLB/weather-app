import React from "react";
import { render } from '@testing-library/react';

import DayForecastDetails from '../components/dayForecastDetails';

const forecastQuery = 'Tokyo'
const currentConditions = { WeatherText: 'sunny', RelativeHumidity: 30, WeatherIcon: 1, PrecipitationSummary: { Precipitation: { Metric: { Value: 1 } } }, Wind: { Speed: { Metric: { Value: 1 } } }, UVIndex: 3, RealFeelTemperature: { Metric: { Value: 1 } }, Temperature: { Metric: { Value: 1 } } }
const dayForecast = { Day: {}, Night: {} }

const childProps = {
  forecastQuery,
  ...currentConditions,
}

describe('<DayForecastDetails />', () => {
  test('Component renders properly', () => {
    const { getByText } = render( <DayForecastDetails {...childProps} forecast={dayForecast} />);

    getByText('sunny');

  });
})
