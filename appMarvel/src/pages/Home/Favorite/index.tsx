import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useFavorite } from '../../../hooks/favorite';
import { IResult } from '../../../models/comic';

import { Container, RemoveButton, Thumbnail } from './styles';

interface IFavorite {
  data: IResult;
}

const Favorite: React.FC<IFavorite> = ({ data }) => {
  const navigation = useNavigation();
  const { handleFavorite } = useFavorite();

  return (
    <Container
      testID="favorite_detail_button"
      onPress={() =>
        navigation.navigate('Detail', { comic: data, isFavorite: true })}
    >
      <RemoveButton
        testID="remove_favorite_button"
        onPress={() => handleFavorite({ id: data.id })}>
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
