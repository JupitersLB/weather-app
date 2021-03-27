import React from "react";
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import Header from '../components/header';
import Swal from 'sweetalert2'

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
  const handleGeoLocationMock = jest.fn();
  const spy = jest.spyOn(Swal, 'fire')

  const wrapper = mount(<Header handleGeoLocation={handleGeoLocationMock} handleSearch={handleSearchMock} />);

  const icon = wrapper.find('.browser-search-icon');
  expect(icon).toHaveLength(1)

  icon.simulate('click');

  // handleClick fires a sweetalert while checking for browser location
  expect(spy).toHaveBeenCalledTimes(1);

})
