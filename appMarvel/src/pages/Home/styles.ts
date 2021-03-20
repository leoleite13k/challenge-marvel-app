import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IResult } from '../../models/comic';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ComicHeader = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: 'RobotoCondensed-Bold';
  font-size: 22px;
  font-weight: 500;
  color: #f4f4f4;

  margin-top: 26px;
  margin-bottom: 16px;
  margin-left: 14px;
`;

export const ComicList = styled(FlatList as new () => FlatList<IResult>).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const FavoriteList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    overflow: 'visible',
    marginHorizontal: 14,
  },
})`
  height: 160px;
  margin-top: 16px;
  overflow: visible;
`;

export const ContentFooterLoader = styled.View`
  align-items: center;
  justify-content: center;
  height: 20px;
`;
