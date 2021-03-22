import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0px 12px 12px 12px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;
  padding: 8px 0px;
`;

export const Thumbnail = styled.ImageBackground`
  height: 60px;
  width: 60px;
  margin-right: 12px;
  border-radius: 6px;
  overflow: hidden;
`;

export const Text = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Bold';
  font-size: 18px;
  margin-left: 4px;
  color: #f4f4f4;
`;
