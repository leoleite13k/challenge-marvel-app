import React, { useState, useEffect } from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';

import Search from './Search';

import {
  Container,
  Title,
  FavoriteList,
  FavoriteContainer,
  FavoriteButton,
  ComicList,
  ComicContainer,
  Portatil,
  Thumbnail,
  ComicTitle,
  ComicInfo,
  ComicName,
} from './styles';

export interface ICreator {
  name: string;
  role: string;
}

export interface IResult {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: ICreator[];
  };
}

interface IComic {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IResult[];
}

const Home: React.FC = () => {
  const [comics, setComics] = useState<IComic | null>(null);
  const [favorites, setFavorites] = useState<IResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const { data } = await api.get('/comics?limit=10&orderBy=title');

      setComics(data.data);
      setLoading(false);
    }

    getData();
  }, []);

  function handleFavorite(id: number) {
    const findIndex = favorites.findIndex(favorite => favorite.id === id);

    if (findIndex >= 0) {
      setFavorites(favorites.filter(favorite => favorite.id !== id));
      return;
    }

    const newFavorite = comics?.results.find(comic => comic.id === id);

    if (newFavorite) {
      setFavorites(oldFavorites => [...oldFavorites, newFavorite]);
    }
  }

  return (
    <Container>
      <Search />

      <Title>Favorites</Title>
      <FavoriteList>
        {favorites.map(({ id, thumbnail }) => (
          <FavoriteContainer key={id}>
            {/* <FavoriteButton onPress={() => handleFavorite(id)}>
              <IoniconsIcon name="ios-star-sharp" size={18} color="#f00" />
            </FavoriteButton> */}
            <Thumbnail
              source={{
                uri: `https://${
                  thumbnail.path.split('http://')[1]
                }/portrait_xlarge.${thumbnail.extension}`,
              }}
            />
          </FavoriteContainer>
        ))}
      </FavoriteList>

      <Title>Comics</Title>
      <ComicList
        data={comics?.results}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => (
          <ComicContainer>
            {/* <FavoriteButton onPress={() => handleFavorite(item.id)}>
              <IoniconsIcon name="ios-star-sharp" size={18} color="#f00" />
            </FavoriteButton> */}
            <Portatil>
              <Thumbnail
                source={{
                  uri: `https://${item.thumbnail.path.split('http://')[1]}.${
                    item.thumbnail.extension
                  }`,
                }}
              />
            </Portatil>

            <ComicInfo>
              <ComicTitle>{item.title}</ComicTitle>
              {item?.creators?.items.map(({ name, role }) => (
                <>{role === 'writer' && <ComicName>{name}</ComicName>}</>
              ))}
            </ComicInfo>
          </ComicContainer>
        )}
      />
    </Container>
  );
};

export default Home;
