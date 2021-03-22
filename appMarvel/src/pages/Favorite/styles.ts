import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IResult } from '../../models/comic';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FavoriteList = styled(FlatList as new () => FlatList<IResult>)`
  padding-top: 18px;
`;
