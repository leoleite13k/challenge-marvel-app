import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';

import { useComic } from '../../hooks/comic';

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
  const [searchIds, setSearchIds] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {
    data,
    favorites,
    loading,
    searchComic,
    searchCharacterByName,
    loadFavorites,
  } = useComic();

  function FooterLoader() {
    if (loading) {
      return <Loader marginTop="50%" />;
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

  const loadMoreComics = async () => {
    const limit = page + 1;

    await searchComic({ limit, ids: searchIds });
    setPage(limit);
  };

  const handleSearch = async (name: string) => {
    if (name) {
      const resultsCharacter = await searchCharacterByName({ name });

      const ids = resultsCharacter
        .slice(0, 10)
        .map((char: { id: number }) => char.id);

      await searchComic({ limit: 1, ids });
      setSearchIds(ids);
      return;
    }

    await searchComic({ limit: 1 });
    setSearchIds([]);
  };

  useEffect(() => {
    async function getData() {
      await Promise.all([searchComic({ limit: 1 }), loadFavorites()]);
    }

    getData();
  }, [loadFavorites, searchComic]);

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
              {favorites.map(item => (
                <Favorite key={item.id} data={item} />
              ))}
            </FavoriteList>

            <Title>Comics</Title>
          </ComicHeader>
        )}
        ListFooterComponent={FooterLoader}
        renderItem={({ item }) => (
          <>{!loading ? <Comic data={item} /> : null}</>
        )}
      />
    </Container>
  );
};

export default Home;
