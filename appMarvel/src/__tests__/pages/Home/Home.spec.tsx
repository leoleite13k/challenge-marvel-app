import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Home from '../../../pages/Home';
import { IResponseData, IResult } from '../../../models/comic';

const data: IResponseData = {
  code: 200,
  status: 'Ok',
  copyright: '© 2021 MARVEL',
  attributionText: 'Data provided by Marvel. © 2021 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>',
  etag: '197a5981192ff85f7273528e504f7baf0eb0ec73',
  data: {
    offset: 0,
    limit: 2,
    total: 48385,
    count: 2,
    results: [
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
    ],
  },
};

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

jest.mock('../../../hooks/comic', () => {
  return {
    useComic: () => ({
      data,
      search: jest.fn(),
      loading: false,
    }),
  };
});

jest.mock('../../../hooks/favorite', () => {
  return {
    useFavorite: () => ({
      data: favorites,
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
