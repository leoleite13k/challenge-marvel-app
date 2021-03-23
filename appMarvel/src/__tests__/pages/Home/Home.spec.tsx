import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Home from '../../../pages/Home';

const mockedHistoryNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedHistoryNavigate,
    }),
    useRoute: () => ({}),
    createNavigatorFactory: jest.fn(),
  };
});

jest.mock('../../../hooks/favorite', () => {
  return {
    useFavorite: () => ({
      data: [],
      loadFavorites: jest.fn(),
    }),
  };
});

describe('Home page', () => {
  it('should be able see all favorites', () => {
    const { getByTestId } = render(<Home />);

    const seeAllButon = getByTestId('see_all_button');

    fireEvent.press(seeAllButon);

    expect(mockedHistoryNavigate).toHaveBeenCalledWith('Favorite');
  });
});
