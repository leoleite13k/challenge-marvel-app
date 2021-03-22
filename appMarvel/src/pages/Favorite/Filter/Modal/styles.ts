import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0px 8px 16px 8px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;
`;

export const Text = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Bold';
  font-size: 18px;
  text-transform: capitalize;
  margin-left: 4px;
  color: #f4f4f4;
`;
