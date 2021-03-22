import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { useComic } from '../../hooks/comic';
import { useFavorite } from '../../hooks/favorite';

import Title from '../../components/Title';
import Loader from '../../components/Loader';
import Comic from '../../components/Comic';

import Favorite from './Favorite';
import Filter from './Filter';

import {
  Container,
  ComicHeader,
  Row,
  SeeAllButton,
  Text,
  FavoriteList,
  ComicList,
  ContentFooterLoader,
} from './styles';

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const { data, loading, setLoading, characterFilter, search } = useComic();
  const { data: dataFavorite, loadFavorites } = useFavorite();
  const navigation = useNavigation();

  const FooterLoader = () => {
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
  };

  const handleSeeAllFavorite = () => {
    navigation.navigate('Favorite');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await search({ limit: 10, character: characterFilter });
    setRefreshing(false);
  };

  const loadMoreComics = async () => {
    if (data.results.length < data.total) {
      setLoadingMore(true);
      const limit = page + 1;

      await search({ limit, character: characterFilter });
      setPage(limit);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    async function getData() {
      await Promise.all([
        search({ limit: 1, character: null }),
        loadFavorites(),
      ]);
      setLoading(false);
    }

    getData();
  }, [loadFavorites, search, setLoading]);

  return (
    <Container>
      <Filter />

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
            <Row>
              <Title>Favorites</Title>
              <SeeAllButton onPress={handleSeeAllFavorite}>
                <Text>See all</Text>
              </SeeAllButton>
            </Row>
            <FavoriteList>
              {dataFavorite.map(favorite => (
                <Favorite key={favorite.id} data={favorite} />
              ))}
            </FavoriteList>

            <Row>
              <Title>Comics</Title>
            </Row>
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
