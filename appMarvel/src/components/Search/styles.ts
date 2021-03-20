import styled from 'styled-components/native';

export const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #555;
  padding-top: 18px;
  padding-bottom: 12px;
`;

export const Content = styled.View`
  height: 36px;
  padding: 8px;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
  margin-left: 14px;
  margin-right: 14px;
  background-color: #fff;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#ddd',
  autoCorrect: false,
})`
  flex: 1;
  height: 36px;

  font-size: 18px;
  color: #000;
`;

export const Word = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
  border-radius: 2px;
  overflow: hidden;

  background-color: #ccc;

  align-items: center;
  justify-content: center;
`;
