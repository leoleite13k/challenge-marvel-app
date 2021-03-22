import React from 'react';

import { useFavorite } from '../../hooks/favorite';

import Comic from '../../components/Comic';
import Filter from './Filter';

import { Container, FavoriteList } from './styles';

const Favorite: React.FC = () => {
  const { data } = useFavorite();

  return (
    <Container>
      <Filter />

      <FavoriteList
        data={data}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => <Comic data={item} />}
      />
    </Container>
  );
};

export default Favorite;
