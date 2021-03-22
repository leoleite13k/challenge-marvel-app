import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import { IResult } from '../models/comic';
import { ICharacter } from '../models/character';
import { useComic } from './comic';

interface IFavorite {
  id: number;
  date?: number;
}

interface FavoriteContextData {
  data: IResult[];
  loading: boolean;
  isFavorite(props: IFavorite): boolean;
  handleFavorite(props: IFavorite): void;
  loadFavorites(): Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextData>(
  {} as FavoriteContextData,
);

const FavoriteProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: dataComic } = useComic();

  const isFavorite = useCallback(
    ({ id }): boolean => {
      const findIndex = data.findIndex(favorite => favorite.id === id);

      return findIndex >= 0;
    },
    [data],
  );

  const handleFavorite = useCallback(
    ({ id, date }) => {
      if (isFavorite({ id })) {
        const newData = data.filter(favorite => favorite.id !== id);

        setData(newData);
        return;
      }

      const newFavorite = dataComic.results.find(comic => comic.id === id);

      if (newFavorite) {
        setData(oldData => [
          ...oldData,
          { ...newFavorite, dateFavorite: date },
        ]);
      }
    },
    [data, dataComic.results, isFavorite],
  );

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    const savedFavorites = await AsyncStorage.getItem('@appMarvel: favorites');

    setData(JSON.parse(savedFavorites || '[]'));
    setLoading(false);
  }, []);

  useEffect(() => {
    async function updatefavorites(): Promise<void> {
      await AsyncStorage.setItem('@appMarvel: favorites', JSON.stringify(data));
    }

    updatefavorites();
  }, [data]);

  return (
    <FavoriteContext.Provider
      value={{
        data,
        loading,
        isFavorite,
        handleFavorite,
        loadFavorites,
      }}>
      {children}
    </FavoriteContext.Provider>
  );
};

function useFavorite(): FavoriteContextData {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorite must be used within an FavoriteProvider');
  }

  return context;
}

export { FavoriteProvider, useFavorite };