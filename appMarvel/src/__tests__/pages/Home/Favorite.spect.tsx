import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Favorite from '../../../pages/Home/Favorite';
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
  dateFavorite: new Date('2020-01-01').getTime(),
};

const mockedHistoryNavigate = jest.fn();
const mockedHandleFavorite = jest.fn();
const mockedRouteParams = { comic, isFavorite: true };

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
      handleFavorite: mockedHandleFavorite,
      isFavorite: jest.fn(),
    }),
  };
});

describe('Home/Favorite page', () => {
  it('should be able see a comic details', () => {
    const { getByTestId } = render(<Favorite data={comic} />);

    const detailButton = getByTestId('favorite_detail_button');

    fireEvent.press(detailButton);

    expect(mockedHistoryNavigate).toHaveBeenCalledWith(
      'Detail',
      mockedRouteParams,
    );
  });

  it('should be able see a comic details', () => {
    const { getByTestId } = render(<Favorite data={comic} />);

    const removeFavoriteButton = getByTestId('remove_favorite_button');

    fireEvent.press(removeFavoriteButton);

    expect(mockedHandleFavorite).toHaveBeenCalledWith({ id: comic.id });
  });
});
