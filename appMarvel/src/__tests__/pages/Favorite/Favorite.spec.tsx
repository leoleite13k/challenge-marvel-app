import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Favorite from '../../../pages/Favorite';
import { IResult } from '../../../models/comic';

const favorites: IResult[] = [
  {
    id: 91992,
    title: ' Fantastic Four by Dan Slott Vol. 1 (Hardcover)',
    description: '',
    pageCount: 368,
    urls: [
      {
        type: 'detail',
        url:
          'http://marvel.com/comics/collection/91992/_fantastic_four_by_dan_slott_vol_1_hardcover?utm_campaign=apiRef&utm_source=10bab138cb8384426205710437215153',
      },
    ],
    dates: [
      {
        type: 'onsaleDate',
        date: '2021-03-10T00:00:00-0500',
      },
      {
        type: 'focDate',
        date: '2020-10-05T00:00:00-0400',
      },
    ],
    prices: [
      {
        type: 'printPrice',
        price: 39.99,
      },
    ],
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/603d5b82a5bc0',
      extension: 'jpg',
    },
    images: [
      {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/603d5b82a5bc0',
        extension: 'jpg',
      },
    ],
    creators: {
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/creators/4430',
          name: 'Jeff Youngquist',
          role: 'editor',
        },
      ],
    },
  },
  {
    id: 71400,
    title: ' Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
    description: '',
    pageCount: 136,
    textObjects: [],
    resourceURI: 'http://gateway.marvel.com/v1/public/comics/71400',
    urls: [
      {
        type: 'detail',
        url:
          'http://marvel.com/comics/collection/71400/_superior_spider-man_vol_2_otto-matic_trade_paperback?utm_campaign=apiRef&utm_source=10bab138cb8384426205710437215153',
      },
    ],
    dates: [
      {
        type: 'onsaleDate',
        date: '2019-12-18T00:00:00-0500',
      },
      {
        type: 'focDate',
        date: '2019-10-28T00:00:00-0400',
      },
    ],
    prices: [
      {
        type: 'printPrice',
        price: 17.99,
      },
    ],
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
      extension: 'jpg',
    },
    images: [
      {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
        extension: 'jpg',
      },
    ],
    creators: {
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/creators/11765',
          name: 'Christos Gage',
          role: 'writer',
        },
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/creators/942',
          name: 'Mike Hawthorne',
          role: 'penciller (cover)',
        },
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/creators/437',
          name: 'Lan Medina',
          role: 'penciller',
        },
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/creators/4430',
          name: 'Jeff Youngquist',
          role: 'editor',
        },
      ],
    },
  },
];

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
      data: favorites,
      isFavorite: jest.fn(),
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
