import React from "react";
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import ForecastList from '../components/forecastList';
import addDay from '../utilities/addDay';

jest.mock('../utilities/bundleLoader', () => ({
  importFiles: () => {
    return ['cat', 'dog']
  },
  loadImage: (images, imageName) => {
    return "./src/assets/images/cat.png"
  }
}))

const time = '2021-03-24T07:00:00+01:00'
const hourlyForecast = [{DateTime: time, Temperature: {}}, {DateTime: time, Temperature: {}}, {DateTime: time, Temperature: {}}, {DateTime: time, Temperature: {}}, {DateTime: time, Temperature: {}}, {DateTime: time, Temperature: {}}]

const date = new Date('2021-03-22T07:00:00+01:00')
const futureForecast = [{Day: {}, Night: {}, Date: date, Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: addDay(date, 1), Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: addDay(date, 2), Temperature: { Maximum: {}, Minimum: {}}}, {Day: {}, Night: {}, Date: addDay(date, 3), Temperature: { Maximum: {}, Minimum: {}}}]

test('renders hourly forecast properly', () => {

  const { getAllByText } = render(<ForecastList forecast={hourlyForecast} type={'hours'} />);

  expect(getAllByText(/Chance of rain/i)).toHaveLength(3);
});

test('renders five day forecast properly', () => {


  const { getAllByText, getByText } = render(<ForecastList forecast={futureForecast} type={'days'} />);

  expect(getAllByText('Day')).toHaveLength(3);
  getByText('Monday')

});

test('cycles over days on click', () => {

  const wrapper = mount(<ForecastList forecast={futureForecast} type={'days'} />);

  const rightButton = wrapper.find('.right-arrow');
  const leftButton = wrapper.find('.left-arrow');

  expect(rightButton).toHaveLength(1);
  expect(leftButton).toHaveLength(1);

  expect(wrapper.text().includes('Monday')).toBe(true);
  expect(wrapper.text().includes('Thursday')).not.toBe(true);

  rightButton.simulate('click');

  expect(wrapper.text().includes('Monday')).not.toBe(true);
  expect(wrapper.text().includes('Thursday')).toBe(true);

  leftButton.simulate('click');

  expect(wrapper.text().includes('Monday')).toBe(true);
  expect(wrapper.text().includes('Thursday')).not.toBe(true);

});

