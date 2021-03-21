import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import { IResponseData, IResult } from '../models/comic';

interface ISearchCharacterByName {
  name: string;
}

interface ISearchComicById {
  id: number;
}

interface ISearchComic {
  limit: number;
  ids?: number[];
}

interface IFavorite {
  id: number;
}

interface ComicContextData {
  data: IResponseData;
  favorites: IResult[];
  isFavorite(props: IFavorite): boolean;
  handleFavorite(props: IFavorite): void;
  loadFavorites(): Promise<void>;
  searchComic(filters: ISearchComic): Promise<void>;
  searchCharacterByName(filters: ISearchCharacterByName): Promise<IResult[]>;
}

const ComicContext = createContext<ComicContextData>({} as ComicContextData);

const ComicProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IResponseData>({} as IResponseData);
  const [favorites, setFavorites] = useState<IResult[]>([]);

  const isFavorite = useCallback(
    ({ id }): boolean => {
      const findIndex = favorites.findIndex(favorite => favorite.id === id);

      return findIndex >= 0;
    },
    [favorites],
  );

  const handleFavorite = useCallback(
    ({ id }) => {
      if (isFavorite({ id })) {
        const newFavorites = favorites.filter(favorite => favorite.id !== id);

        setFavorites(newFavorites);
        return;
      }

      const newFavorite = data.results.find(item => item.id === id);

      if (newFavorite) {
        setFavorites(oldFavorites => [...oldFavorites, newFavorite]);
      }
    },
    [data.results, favorites, isFavorite],
  );

  const loadFavorites = useCallback(async () => {
    const savedFavorites = await AsyncStorage.getItem('@appMarvel: favorites');

    setFavorites(JSON.parse(savedFavorites || '[]'));
  }, []);

  const searchComic = useCallback(async ({ limit, ids = [] }) => {
    const newLimit = limit * 10;

    const { data: response } = await api.get(
      `/comics?format=comic&limit=${newLimit}&orderBy=title${
        ids.length > 0 ? `&characters=${ids}` : ''
      }`,
    );

    setData(response?.data);
  }, []);

  const searchCharacterByName = useCallback(async ({ name }): Promise<
    IResult[]
  > => {
    const { data: responseChar } = await api.get(
      `/characters?nameStartsWith=${name}`,
    );

    return responseChar.data.results;
  }, []);

  useEffect(() => {
    async function updatefavorites(): Promise<void> {
      await AsyncStorage.setItem(
        '@appMarvel: favorites',
        JSON.stringify(favorites),
      );
    }

    updatefavorites();
  }, [favorites]);

  return (
    <ComicContext.Provider
      value={{
        data,
        favorites,
        isFavorite,
        handleFavorite,
        loadFavorites,
        searchComic,
        searchCharacterByName,
      }}>
      {children}
    </ComicContext.Provider>
  );
};

function useComic(): ComicContextData {
  const context = useContext(ComicContext);

  if (!context) {
    throw new Error('useComic must be used within an ComicProvider');
  }

  return context;
}

export { ComicProvider, useComic };
