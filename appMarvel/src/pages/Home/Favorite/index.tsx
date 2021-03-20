import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { IResult } from '../../../models/comic';

import { Container, RemoveButton, Thumbnail } from './styles';

interface IFavorite {
  data: IResult;
  handleOpenComic(id: number): void;
  handleRemoveFavorite(id: number): void;
}

const Favorite: React.FC<IFavorite> = ({
  data,
  handleOpenComic,
  handleRemoveFavorite,
}) => {
  return (
    <Container onPress={() => handleOpenComic(data.id)}>
      <RemoveButton onPress={() => handleRemoveFavorite(data.id)}>
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
