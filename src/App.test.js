import React from "react";
import { render, fireEvent, wait } from '@testing-library/react';

import App from './App';

test('renders components properly', () => {
  // const query = 'Tokyo'

  const { getByText, getByTitle, getByLabelText } = render(<App />);

  //header
  getByText("JupitersLB Weather App");

  //header label
  // const input = getByLabelText('City:');

  // fireEvent.change(input, { target: { value: query } });
  // fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

  // wait(() => getByText(query));


  //footer
  getByTitle("Gmail");
});
