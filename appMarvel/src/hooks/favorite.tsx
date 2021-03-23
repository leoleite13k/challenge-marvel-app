/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IResponseData, IResult } from '../models/comic';
import { sortByField } from '../utils/format';

interface ISort {
  sort: string;
}

interface IFavorite {
  id: number;
  date?: number;
  comics?: IResponseData;
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

  const isFavorite = useCallback(
    ({ id }): boolean => {
      const findIndex = data.findIndex(favorite => favorite.id === id);

      return findIndex >= 0;
    },
    [data],
  );

  const handleFavorite = useCallback(
    ({ id, date, comics = [] }) => {
      if (isFavorite({ id })) {
        const newData = data.filter(favorite => favorite.id !== id);

        setData(newData);
        return;
      }

      const newFavorite = comics.results.find(comic => comic.id === id);

      if (newFavorite) {
        const newData = [...data, { ...newFavorite, dateFavorite: date }];

        setData(newData.sort((a, b) => sortByField(a, b, order)));
      }
    },
    [data, isFavorite, order],
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
        style: 'default',
      },
    ]);
  }, []);

  const handleSort = useCallback(
    ({ sort }) => {
      const newOrder = sort === 'date' ? 'dateFavorite' : sort;

      setData(data.sort((a, b) => sortByField(a, b, newOrder)));
      setOrder(newOrder);
    },
    [data],
  );

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    const savedFavorites = await AsyncStorage.getItem('@appMarvel:favorites');

    setData(JSON.parse(savedFavorites || '[]'));
    setLoading(false);
  }, []);

  useEffect(() => {
    async function updatefavorites(): Promise<void> {
      await AsyncStorage.setItem('@appMarvel:favorites', JSON.stringify(data));
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
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

function useFavorite(): FavoriteContextData {
  const context = useContext(FavoriteContext);

  return context;
}

export { FavoriteProvider, useFavorite };
