import React from 'react';
import { render } from '@testing-library/react-native';

import Home from '../../pages/Home';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('Home page', () => {
  it('should be render home page', () => {
    const { debug } = render(<Home />);

    debug();
  });
});
