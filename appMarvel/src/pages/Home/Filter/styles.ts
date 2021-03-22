import styled from 'styled-components/native';

export const Container = styled.View`
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #555;
`;

export const Content = styled.View`
  flex: 1;
  padding: 12px;
  border-radius: 2px;
  overflow: hidden;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: 'RobotoCondensed-Regular';
  font-size: 16px;
  color: #caa96d;
`;

export const TextFilter = styled(Text)`
  font-family: 'RobotoCondensed-Bold';
  margin-left: 4px;
  color: #f4f4f4;
`;

export const ButtonClear = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  height: 28px;
  margin-right: 16px;

  align-items: center;
  justify-content: center;
`;

export const TextClear = styled.Text`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: #f4f4f4;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  height: 28px;
  width: 28px;
  border-radius: 2px;
  overflow: hidden;

  align-items: center;
  justify-content: center;
`;

export const HeaderModal = styled.View`
  justify-content: center;
  height: 60px;
  padding: 12px;

  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
