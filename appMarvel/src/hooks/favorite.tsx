import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IResult } from '../models/comic';
import { useComic } from './comic';

interface ISort {
  sort: string;
}

interface IFavorite {
  id: number;
  date?: number;
}

interface FavoriteContextData {
  data: IResult[];
  order: string;
  loading: boolean;
  isFavorite(props: IFavorite): boolean;
  handleFavorite(props: IFavorite): void;
  handleClearAll(): void;
  handleSort(props: ISort): void;
  loadFavorites(): Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextData>(
  {} as FavoriteContextData,
);

const FavoriteProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IResult[]>([]);
  const [order, setOrder] = useState<string>('dateFavorite');
  const [loading, setLoading] = useState<boolean>(true);

  const { data: dataComic } = useComic();

  const isFavorite = useCallback(
    ({ id }): boolean => {
      const findIndex = data.findIndex(favorite => favorite.id === id);

      return findIndex >= 0;
    },
    [data],
  );

  const sortFavorite = (a: IResult, b: IResult, field: string) => {
    if (a[field] < b[field]) {
      return -1;
    }

    if (a[field] > b[field]) {
      return 1;
    }

    return 0;
  };

  const handleFavorite = useCallback(
    ({ id, date }) => {
      if (isFavorite({ id })) {
        const newData = data.filter(favorite => favorite.id !== id);

        setData(newData);
        return;
      }

      const newFavorite = dataComic.results.find(comic => comic.id === id);

      if (newFavorite) {
        const newData = [...data, { ...newFavorite, dateFavorite: date }];

        setData(newData.sort((a, b) => sortFavorite(a, b, order)));
      }
    },
    [data, dataComic.results, isFavorite],
  );

  const handleClearAll = useCallback(() => {
    Alert.alert('Remove all', 'Do you want to remove all favorites?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => setData([]),
        style: 'ok',
      },
    ]);
  }, []);

  const handleSort = useCallback(
    ({ sort }) => {
      const newOrder = sort === 'date' ? 'dateFavorite' : sort;

      setData(data.sort((a, b) => sortFavorite(a, b, newOrder)));
      setOrder(newOrder);
    },
    [data],
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
        order,
        loading,
        isFavorite,
        handleFavorite,
        handleClearAll,
        handleSort,
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
