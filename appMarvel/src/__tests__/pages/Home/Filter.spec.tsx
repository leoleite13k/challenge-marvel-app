import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Filter from '../../../pages/Home/Filter';
import { ICharacter } from '../../../models/character';

const characterFilter: ICharacter = {
  id: 1009351,
  name: 'Hulk',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
    extension: 'jpg',
  },
};

const mockedSearch = jest.fn();
const mockedSetCharacterFilter = jest.fn();

jest.mock('../../../hooks/comic', () => {
  return {
    useComic: () => ({
      search: mockedSearch,
      characterFilter,
      setCharacterFilter: mockedSetCharacterFilter,
      setLoading: jest.fn(),
    }),
  };
});

describe('Home/Filter page', () => {
  it('should be able clear filter', () => {
    const { getByTestId } = render(<Filter />);

    const buttonClear = getByTestId('filter_button_clear');

    fireEvent.press(buttonClear);

    expect(mockedSearch).toBeCalled();
  });
});
