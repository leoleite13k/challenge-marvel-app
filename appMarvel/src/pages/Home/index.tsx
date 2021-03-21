import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import Lottie from 'lottie-react-native';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const {
    data,
    favorites,
    searchComic,
    searchCharacterByName,
    loadFavorites,
  } = useComic();

  function FooterLoader() {
    if (loading) {
      return <Loader marginTop="40%" />;
    }

    if (loadingMore && !loading) {
      return (
        <ContentFooterLoader>
          <Lottie
            source={require('../../../assets/lotties/loader.json')}
            autoPlay
            loop
          />
        </ContentFooterLoader>
      );
    }

    return null;
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await searchComic({ limit: 10, ids: searchIds });
    setRefreshing(false);
  };

  const loadMoreComics = async () => {
    setLoadingMore(true);
    const limit = page + 1;

    await searchComic({ limit, ids: searchIds });
    setPage(limit);
    setLoadingMore(false);
  };

  const handleSearch = async (name: string) => {
    setLoading(true);
    if (name) {
      const resultsCharacter = await searchCharacterByName({ name });

      const ids = resultsCharacter
        .slice(0, 10)
        .map((char: { id: number }) => char.id);

      await searchComic({ limit: 1, ids });
      setSearchIds(ids);
      setLoading(false);
      return;
    }

    await searchComic({ limit: 1 });
    setSearchIds([]);
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      await Promise.all([searchComic({ limit: 1 }), loadFavorites()]);
      setLoading(false);
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
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            title="refreshing..."
            titleColor="#ccc"
            tintColor="#ccc"
          />
        )}
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
