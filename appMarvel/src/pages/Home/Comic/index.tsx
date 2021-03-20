import React from 'react';
import { View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { IResult } from '../../../models/comic';

import {
  Container,
  Portatil,
  Thumbnail,
  FavoriteButton,
  Info,
  Title,
  Writer,
} from './styles';

interface IComic {
  data: IResult;
  isFavorite(id: number): boolean;
  handleOpenComic(id: number): void;
  handleFavorite(id: number): void;
}

const Comic: React.FC<IComic> = ({
  data,
  isFavorite,
  handleOpenComic,
  handleFavorite,
}) => {
  return (
    <Container key={data?.id} onPress={() => handleOpenComic(data.id)}>
      <Portatil>
        <SharedElement id={`${data?.id}-bg`}>
          <Thumbnail
            source={{
              uri: `https://${data.thumbnail.path.split('http://')[1]}.${
                data.thumbnail.extension
              }`,
            }}
          />
        </SharedElement>
        <FavoriteButton onPress={() => handleFavorite(data.id)}>
          <AntDesignIcon
            name={isFavorite(data.id) ? 'heart' : 'hearto'}
            size={18}
            color={isFavorite(data.id) ? '#f00' : '#fff'}
          />
        </FavoriteButton>
      </Portatil>

      <Info>
        <SharedElement id={`${data?.id}-title`}>
          <Title>{data.title}</Title>
        </SharedElement>
        {data.creators?.items.map(({ name, role }) => (
          <View key={`${data.id}-${name}`}>
            {role === 'writer' && <Writer>{name}</Writer>}
          </View>
        ))}
      </Info>
    </Container>
  );
};

export default Comic;
