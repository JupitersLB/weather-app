import React from "react";
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import Header from '../components/header';

test('renders components properly', () => {
  const handleSearchMock = jest.fn();
  const handleGeoLocationMock = jest.fn()

  const { getByText } = render(<Header handleGeoLocation={handleGeoLocationMock} handleSearch={handleSearchMock} />);

  getByText("JupitersLB Weather App");
});

test('Pressing enter submits value', () => {

  const handleSearchMock = jest.fn();
  const handleGeoLocationMock = jest.fn()

  const query = 'Tokyo'

  const wrapper = mount(<Header handleGeoLocation={handleGeoLocationMock} handleSearch={handleSearchMock} />);

  expect(wrapper.find('[htmlFor="new-search"]')).toHaveLength(1)

  const form = wrapper.find('[htmlFor="new-search"]')
  form.simulate('change', { target: { value: query } })
  form.simulate('submit')

  expect(handleSearchMock).toHaveBeenCalledTimes(1);

})

test('clicking on icon searches browser location', () => {

  const handleSearchMock = jest.fn();
  const handleGeoLocationMock = jest.fn()

  const wrapper = mount(<Header handleGeoLocation={handleGeoLocationMock} handleSearch={handleSearchMock} />);

  expect(wrapper.find('svg')).toHaveLength(1)

  const svg = wrapper.find('svg')
  svg.simulate('click')

  expect(handleGeoLocationMock).toHaveBeenCalledTimes(1);

})
