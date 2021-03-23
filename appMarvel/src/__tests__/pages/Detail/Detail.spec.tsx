import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Detail from '../../../pages/Detail';
import { IResult } from '../../../models/comic';

const comic: IResult = {
  id: 82967,
  title: 'Marvel Previews (2017)',
  pageCount: 233,
  urls: [
    {
      type: 'detail',
      url:
        'http://marvel.com/comics/issue/82967/marvel_previews_2017?utm_campaign=apiRef&utm_source=10bab138cb8384426205710437215153',
    },
  ],
  dates: [
    {
      type: 'onsaleDate',
      date: '2099-10-30T00:00:00-0500',
    },
    {
      type: 'focDate',
      date: '2019-10-07T00:00:00-0400',
    },
  ],
  prices: [
    {
      type: 'printPrice',
      price: 0,
    },
  ],
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
    extension: 'jpg',
  },
  creators: {
    items: [
      {
        name: 'Jim Nausedas',
        role: 'editor',
      },
    ],
  },
};

const mockedOpenUrl = jest.fn();
const mockedHistoryGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedHistoryGoBack,
    }),
    useRoute: () => ({ params: { comic, isFavorite: false } }),
    createNavigatorFactory: jest.fn(),
  };
});

jest.mock('react-native/Libraries/Linking/Linking', () => {
  return {
    openURL: mockedOpenUrl,
  };
});

jest.mock('../../../hooks/detail', () => {
  return {
    useDetail: () => ({
      data: comic,
      loading: true,
      searchById: jest.fn(),
      setData: jest.fn(),
    }),
  };
});

jest.mock('../../../hooks/favorite', () => {
  return {
    useFavorite: () => ({
      isFavorite: jest.fn(),
    }),
  };
});

describe('Detail page', () => {
  it('should be able go back page', () => {
    const { getByTestId } = render(<Detail />);

    const backButton = getByTestId('back_button');

    fireEvent.press(backButton);

    expect(mockedHistoryGoBack).toBeCalled();
  });
});
