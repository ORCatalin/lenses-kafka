import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Dropdown, { IOption } from "./Dropdown";

const options: IOption[] = [{ label: "1", value: "2" }, { label: "3", value: "4" }];

const renderDropdown = () => render(
  <Dropdown title="Test" options={options} value={options[1]} onChange={() => {
  }}/>
)

describe('Dropdown component', () => {
  test('is rendering', () => {
    const { asFragment } = renderDropdown();
    expect(asFragment()).toMatchSnapshot();
  })
  test('has active option', () => {
    const { container } = renderDropdown();
    expect(container.getElementsByClassName('dropdown-item is-active').length).toBe(1)
  })
  test('opens on click', () => {
    const { container } = renderDropdown();
    fireEvent.click(container.getElementsByTagName('button')[0]);
    expect(container.getElementsByClassName('dropdown is-active').length).toBe(1);
  });
});

