import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useComic } from '../../../hooks/comic';
import { IResult } from '../../../models/comic';

import { Container, RemoveButton, Thumbnail } from './styles';

interface IFavorite {
  data: IResult;
}

const Favorite: React.FC<IFavorite> = ({ data }) => {
  const navigation = useNavigation();
  const { handleFavorite } = useComic();

  return (
    <Container
      onPress={() =>
        navigation.navigate('Detail', { comic: data, isFavorite: true })}
    >
      <RemoveButton onPress={() => handleFavorite({ id: data.id })}>
        <IoniconsIcon name="close" size={22} color="#fff" />
      </RemoveButton>
      <SharedElement id={`${data?.id}-favorite`}>
        <Thumbnail
          source={{
            uri: `https://${
              data.thumbnail.path.split('http://')[1]
            }/portrait_xlarge.${data.thumbnail.extension}`,
          }}
        />
      </SharedElement>
    </Container>
  );
};

export default Favorite;
