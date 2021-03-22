import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { IResult } from '../../models/comic';
import { useFavorite } from '../../hooks/favorite';

import { Container } from './styles';

interface IFavoriteButton {
  data: IResult;
}

const FavoriteButton: React.FC<IFavoriteButton> = ({ data }) => {
  const { isFavorite, handleFavorite } = useFavorite();

  return (
    <Container
      onPress={() =>
        handleFavorite({ id: data.id, date: new Date().getTime() })}
    >
      <AntDesignIcon
        name={isFavorite({ id: data.id }) ? 'heart' : 'hearto'}
        size={18}
        color={isFavorite({ id: data.id }) ? '#f00' : '#fff'}
      />
    </Container>
  );
};

export default FavoriteButton;
