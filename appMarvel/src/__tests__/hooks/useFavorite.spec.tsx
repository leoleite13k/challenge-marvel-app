import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapater from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FavoriteProvider, useFavorite } from '../../hooks/favorite';
import { ComicProvider, useComic } from '../../hooks/comic';
import api from '../../services/api';

const apiMock = new MockAdapater(api);

describe('Comic hook', () => {
  it('should be able check is favorite', () => {
    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    });

    act(() => {
      result.current.isFavorite({
        id: 82967,
      });
    });
  });

  it('should be able add favorite to list', async () => {
    const response = {
      code: 200,
      status: 'Ok',
      copyright: '© 2021 MARVEL',
      attributionText: 'Data provided by Marvel. © 2021 MARVEL',
      attributionHTML:
        '<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>',
      etag: '7bdbee47d796a94e43c628fe44223715a9655f58',
      data: {
        offset: 0,
        limit: 1,
        total: 1,
        count: 1,
        results: [
          {
            id: 82967,
            digitalId: 0,
            title: 'Marvel Previews (2017)',
            issueNumber: 0,
            variantDescription: '',
            description: null,
            modified: '2019-11-07T08:46:15-0500',
            isbn: '',
            upc: '75960608839302811',
            diamondCode: '',
            ean: '',
            issn: '',
            format: '',
            pageCount: 112,
            textObjects: [],
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/82967',
            urls: [
              {
                type: 'detail',
                url:
                  'http://marvel.com/comics/issue/82967/marvel_previews_2017?utm_campaign=apiRef&utm_source=10bab138cb8384426205710437215153',
              },
            ],
            series: {
              resourceURI: 'http://gateway.marvel.com/v1/public/series/23665',
              name: 'Marvel Previews (2017 - Present)',
            },
            variants: [
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/82965',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/82970',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/82969',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/74697',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/72736',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/75668',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/65364',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/65158',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/65028',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/75662',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/74320',
                name: 'Marvel Previews (2017)',
              },
              {
                resourceURI: 'http://gateway.marvel.com/v1/public/comics/73776',
                name: 'Marvel Previews (2017)',
              },
            ],
            collections: [],
            collectedIssues: [],
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
              path:
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
              extension: 'jpg',
            },
            images: [],
            creators: {
              available: 1,
              collectionURI:
                'http://gateway.marvel.com/v1/public/comics/82967/creators',
              items: [
                {
                  resourceURI:
                    'http://gateway.marvel.com/v1/public/creators/10021',
                  name: 'Jim Nausedas',
                  role: 'editor',
                },
              ],
              returned: 1,
            },
            characters: {
              available: 0,
              collectionURI:
                'http://gateway.marvel.com/v1/public/comics/82967/characters',
              items: [],
              returned: 0,
            },
            stories: {
              available: 2,
              collectionURI:
                'http://gateway.marvel.com/v1/public/comics/82967/stories',
              items: [
                {
                  resourceURI:
                    'http://gateway.marvel.com/v1/public/stories/183698',
                  name: 'cover from Marvel Previews (2017)',
                  type: 'cover',
                },
                {
                  resourceURI:
                    'http://gateway.marvel.com/v1/public/stories/183699',
                  name: 'story from Marvel Previews (2017)',
                  type: 'interiorStory',
                },
              ],
              returned: 2,
            },
            events: {
              available: 0,
              collectionURI:
                'http://gateway.marvel.com/v1/public/comics/82967/events',
              items: [],
              returned: 0,
            },
          },
        ],
      },
    };

    apiMock
      .onGet('/comics?format=comic&limit=1&orderBy=title')
      .reply(200, response);

    const { result: resultComic, waitForNextUpdate } = renderHook(
      () => useComic(),
      {
        wrapper: ComicProvider,
      },
    );

    resultComic.current.search({
      limit: 0.1,
    });

    await waitForNextUpdate();

    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    });

    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

    act(() => {
      result.current.handleFavorite({
        id: 82967,
        date: new Date('2020-01-01').getTime(),
        comics: resultComic.current.data,
      });
    });

    expect(result.current.data[0].id).toEqual(
      resultComic.current.data.results[0].id,
    );
    expect(result.current.order).toEqual('dateFavorite');
    expect(setItemSpy).toBeCalled();
  });

  it('should be able remove favorite to list', async () => {
    const favorites = [
      {
        id: 82967,
        digitalId: 0,
        title: 'Marvel Previews (2017)',
        issueNumber: 0,
        variantDescription: '',
        description: null,
        modified: '2019-11-07T08:46:15-0500',
        isbn: '',
        upc: '75960608839302811',
        diamondCode: '',
        ean: '',
        issn: '',
        format: '',
        pageCount: 112,
        textObjects: [],
        resourceURI: 'http://gateway.marvel.com/v1/public/comics/82967',
        urls: [
          {
            type: 'detail',
            url:
              'http://marvel.com/comics/issue/82967/marvel_previews_2017?utm_campaign=apiRef&utm_source=10bab138cb8384426205710437215153',
          },
        ],
        series: {
          resourceURI: 'http://gateway.marvel.com/v1/public/series/23665',
          name: 'Marvel Previews (2017 - Present)',
        },
        variants: [
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/82965',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/82970',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/82969',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/74697',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/72736',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/75668',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/65364',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/65158',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/65028',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/75662',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/74320',
            name: 'Marvel Previews (2017)',
          },
          {
            resourceURI: 'http://gateway.marvel.com/v1/public/comics/73776',
            name: 'Marvel Previews (2017)',
          },
        ],
        collections: [],
        collectedIssues: [],
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
          path:
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: 'jpg',
        },
        images: [],
        creators: {
          available: 1,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/82967/creators',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/creators/10021',
              name: 'Jim Nausedas',
              role: 'editor',
            },
          ],
          returned: 1,
        },
        characters: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/82967/characters',
          items: [],
          returned: 0,
        },
        stories: {
          available: 2,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/82967/stories',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/stories/183698',
              name: 'cover from Marvel Previews (2017)',
              type: 'cover',
            },
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/stories/183699',
              name: 'story from Marvel Previews (2017)',
              type: 'interiorStory',
            },
          ],
          returned: 2,
        },
        events: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/82967/events',
          items: [],
          returned: 0,
        },
        dateFavorite: new Date('2020-01-01').getTime(),
      },
    ];

    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(key => {
      if (key === '@appMarvel:favorites') return JSON.stringify(favorites);

      return null;
    });

    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');
    const { result, waitForNextUpdate } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    });

    result.current.loadFavorites();
    await waitForNextUpdate();

    act(() => {
      result.current.handleFavorite({
        id: 82967,
        date: new Date('2020-01-01').getTime(),
      });
    });

    expect(result.current.data).toEqual([]);
    expect(setItemSpy).toBeCalled();
  });

  it('should be able sort favorites', async () => {
    const { result } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    });

    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

    act(() => {
      result.current.handleSort({ sort: 'date' });
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.order).toEqual('dateFavorite');
    expect(setItemSpy).toBeCalled();
  });

  it('should be able load favorites', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFavorite(), {
      wrapper: FavoriteProvider,
    });

    const getItemSpy = jest.spyOn(AsyncStorage, 'getItem');
    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

    result.current.loadFavorites();

    await waitForNextUpdate();

    expect(getItemSpy).toBeCalled();
    expect(result.current.loading).toBeFalsy();
    expect(setItemSpy).toBeCalled();
  });
});
