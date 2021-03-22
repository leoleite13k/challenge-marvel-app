import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IResult } from '../../models/comic';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ComicHeader = styled.View`
  margin-bottom: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 26px 14px 16px 14px;
`;

export const SeeAllButton = styled.TouchableOpacity``;

export const Text = styled.Text`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: #f4f4f4;
`;

export const ComicList = styled(FlatList as new () => FlatList<IResult>).attrs({
  scrollIndicatorInsets: {
    top: 330,
  },
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
  height: 40px;
`;
