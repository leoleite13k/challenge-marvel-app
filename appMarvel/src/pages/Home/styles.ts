import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IResult } from './index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  font-size: 22px;
  font-weight: 500;
  color: #f4f4f4;

  margin-top: 26px;
  margin-bottom: 16px;
  margin-left: 16px;
`;

export const FavoriteList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    overflow: 'visible',
    marginHorizontal: 16,
  },
})`
  max-height: 240px;
  height: 100%;
  overflow: visible;
`;

export const FavoriteContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  position: relative;
  height: 100%;
  width: 100px;
  margin-right: 18px;
`;

export const FavoriteButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
  elevation: 1,
  hitSlop: {
    top: 10,
    bottom: 5,
    left: 5,
    right: 5,
  },
})`
  position: absolute;
  top: -11px;
  left: -8px;

  z-index: 2;
`;

export const ComicList = styled(FlatList as new () => FlatList<IResult>).attrs({
  contentContainerStyle: {
    overflow: 'visible',
    marginHorizontal: 16,
  },
})``;

export const ComicContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  height: 140px;
  flex-direction: row;

  margin-bottom: 18px;
`;

export const Portatil = styled.View`
  flex: 1;
  max-width: 90px;
  margin-right: 12px;
`;

export const Thumbnail = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;

export const ComicInfo = styled.View`
  flex: 1;
`;

export const ComicTitle = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: 'RobotoCondensed-Bold';
  margin-top: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 12px;
  color: #f4f4f4;
`;

export const ComicName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: #caa96d;
  margin-top: 6px;
`;
