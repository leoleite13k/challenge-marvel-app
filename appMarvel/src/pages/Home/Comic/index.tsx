import React from 'react';
import { View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { useComic } from '../../../hooks/comic';
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
}

const Comic: React.FC<IComic> = ({ data }) => {
  const navigation = useNavigation();

  const { isFavorite, handleFavorite } = useComic();

  return (
    <Container
      key={data?.id}
      onPress={() =>
        navigation.navigate('Detail', { comic: data, isFavorite: false })}
    >
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
        <FavoriteButton onPress={() => handleFavorite({ id: data.id })}>
          <AntDesignIcon
            name={isFavorite({ id: data.id }) ? 'heart' : 'hearto'}
            size={18}
            color={isFavorite({ id: data.id }) ? '#f00' : '#fff'}
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
