import React from 'react';
import { View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

import { IResult } from '../../models/comic';
import { formatDate } from '../../utils/format';
import FavoriteButton from '../FavoriteButton';

import {
  Container,
  Portatil,
  Thumbnail,
  Info,
  Title,
  ContentWriter,
  Writer,
  Row,
  TitleDate,
  Date,
} from './styles';

interface IComic {
  data: IResult;
}

const Comic: React.FC<IComic> = ({ data }) => {
  const navigation = useNavigation();

  return (
    <Container
      testID="comic_button"
      key={data?.id}
      onPress={() =>
        navigation.navigate('Detail', { comic: data, isFavorite: false })
      }>
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
        <FavoriteButton data={data} />
      </Portatil>

      <Info>
        <SharedElement id={`${data?.id}-title`}>
          <Title>{data.title}</Title>
        </SharedElement>
        <ContentWriter>
          {data.creators?.items.map(({ name, role }) => (
            <View key={`${data.id}-${name}`}>
              {role === 'writer' && <Writer>{name}</Writer>}
            </View>
          ))}
        </ContentWriter>
        {data.dateFavorite && (
          <Row>
            <TitleDate>Favored:</TitleDate>
            <Date>{formatDate(data.dateFavorite)}</Date>
          </Row>
        )}
      </Info>
    </Container>
  );
};

export default Comic;
