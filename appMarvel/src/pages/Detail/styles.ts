import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IText {
  color?: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Banner = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

export const BackButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-top: ${getStatusBarHeight() + 16}px;
  margin-left: 14px;
`;

export const ContentInfo = styled.View`
  margin: 0px 14px 8px 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.ScrollView`
  position: relative;
  flex: 1;
  padding: 8px 14px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  flex: 1;
  height: 190px;

  padding: 0px 12px 22px 12px;
`;

export const Buy = styled.View`
  height: 40px;
  flex-direction: row;
  justify-content: flex-end;

  margin-bottom: 12px;
`;

export const ButtonBuy = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#caa96d')};
  width: 80px;
  height: 40px;
  border-radius: 40px;
  margin-left: 12px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Description = styled.View`
  flex: 1;
  height: 160px;
  border-top-width: 1px;
  border-top-color: #555;
  flex-direction: row;
`;

export const Column = styled.View`
  flex: 1;
  max-height: 160px;

  align-items: center;
`;

export const TextTitle = styled.Text<IText>`
  font-family: 'RobotoCondensed-Bold';
  font-size: 16px;
  color: #f4f4f4;
  margin-top: 12px;
`;

export const TextAbout = styled(TextTitle)`
  font-family: 'RobotoCondensed-Regular';
  margin-top: 0px;
`;

export const TextBuy = styled(TextTitle).attrs({
  numberOfLines: 1,
})`
  margin-top: 0px;
`;

export const Text = styled(TextTitle).attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: ${({ color }) => color || '#f4f4f4'};
  margin-top: 4px;
`;

export const Writer = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #caa96d;
  margin-top: 4px;
`;
