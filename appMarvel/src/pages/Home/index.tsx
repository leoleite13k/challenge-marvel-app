import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import { IResponseData, IResult } from '../../models/comic';
import Search from '../../components/Search';
import Title from '../../components/Title';
import Loader from '../../components/Loader';

import Favorite from './Favorite';
import Comic from './Comic';

import {
  Container,
  ComicHeader,
  ComicList,
  FavoriteList,
  ContentFooterLoader,
} from './styles';

const Home: React.FC = () => {
  const [data, setData] = useState<IResponseData | undefined>(undefined);
  const [favorites, setFavorites] = useState<IResult[]>([]);
  const [searchIds, setSearchIds] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation();

  function FooterLoader() {
    if (loading) {
      return <Loader />;
    }

    if (
      (!loading && data && data?.results.length < 10) ||
      data?.results.length === data?.total ||
      refreshing
    )
      return null;

    return (
      <ContentFooterLoader>
        <ActivityIndicator size="small" color="#ccc" />
      </ContentFooterLoader>
    );
  }

  function isFavorite(id: number): boolean {
    const findIndex = favorites.findIndex(favorite => favorite.id === id);

    return findIndex >= 0;
  }

  function handleFavorite(id: number) {
    if (isFavorite(id)) {
      const newFavorites = favorites.filter(favorite => favorite.id !== id);

      setFavorites(newFavorites);
      return;
    }

    const newFavorite = data?.results.find(comic => comic.id === id);

    if (newFavorite) {
      setFavorites(oldFavorites => [...oldFavorites, newFavorite]);
    }
  }

  function handleOpenComic(comic: IResult, openFavorite = false) {
    navigation.navigate('Comic', { comic, isFavorite: openFavorite });
  }

  async function loadComics(limit: number, ids: number[] = []) {
    const newLimit = limit * 10;

    const { data: response } = await api.get(
      `/comics?format=comic&limit=${newLimit}&orderBy=title${
        ids.length > 0 ? `&characters=${ids}` : ''
      }`,
    );

    setData(response?.data);
    setRefreshing(false);
  }

  async function loadMoreComics() {
    const newPage = page + 1;

    await loadComics(newPage, searchIds);
    setPage(newPage);
  }

  async function handleSearch(text: string) {
    if (text) {
      setLoading(true);

      const { data: responseChar } = await api.get(
        `/characters?nameStartsWith=${text}`,
      );

      const ids = responseChar?.data.results
        .slice(0, 10)
        .map((char: { id: number }) => char.id);

      await loadComics(1, ids);
      setSearchIds(ids);
      return;
    }

    await loadComics(1);
    setSearchIds([]);
  }

  async function loadFavorites() {
    const savedFavorites = await AsyncStorage.getItem('@appMarvel: favorites');

    setFavorites(JSON.parse(savedFavorites || '[]'));
  }

  useEffect(() => {
    async function getData() {
      await Promise.all([loadComics(1), loadFavorites()]);

      setLoading(false);
    }

    getData();
  }, []);

  useEffect(() => {
    async function updatefavorites() {
      await AsyncStorage.setItem(
        '@appMarvel: favorites',
        JSON.stringify(favorites),
      );
    }

    updatefavorites();
  }, [favorites]);

  return (
    <Container>
      <Search placeholder="Character" onChangeText={handleSearch} />

      <ComicList
        keyExtractor={({ id }) => String(id)}
        data={data?.results}
        nestedScrollEnabled
        onEndReached={loadMoreComics}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadComics(10, searchIds);
            }}
            title="refreshing..."
            titleColor="#ccc"
            tintColor="#ccc"
          />
        }
        ListHeaderComponent={() => (
          <ComicHeader>
            <Title>Favorites</Title>
            <FavoriteList>
              {favorites.map(favorite => (
                <Favorite
                  key={`${favorite.id}-favorite`}
                  data={favorite}
                  handleOpenComic={() => handleOpenComic(favorite, true)}
                  handleRemoveFavorite={handleFavorite}
                />
              ))}
            </FavoriteList>

            <Title>Comics</Title>
          </ComicHeader>
        )}
        ListFooterComponent={FooterLoader}
        renderItem={({ item }) => (
          <>
            {!loading ? (
              <Comic
                data={item}
                isFavorite={isFavorite}
                handleOpenComic={() => handleOpenComic(item)}
                handleFavorite={handleFavorite}
              />
            ) : null}
          </>
        )}
      />
    </Container>
  );
};

export default Home;
