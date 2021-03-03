import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from "./Button";

describe('Button component', () => {
  test('is rendering', () => {
    const { asFragment } = render(
      <Button>Test</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  })
});
