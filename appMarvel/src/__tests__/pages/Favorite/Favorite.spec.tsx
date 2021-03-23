import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Favorite from '../../../pages/Favorite';

const mockedHistoryGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedHistoryGoBack,
    }),
    useRoute: () => ({}),
    createNavigatorFactory: jest.fn(),
  };
});

jest.mock('../../../hooks/favorite', () => {
  return {
    useFavorite: () => ({
      data: [],
    }),
  };
});

describe('Favorite page', () => {
  it('should be able back page', () => {
    const { getByTestId } = render(<Favorite />);

    const backButton = getByTestId('filter_back_button');

    fireEvent.press(backButton);

    expect(mockedHistoryGoBack).toBeCalled();
  });
});
