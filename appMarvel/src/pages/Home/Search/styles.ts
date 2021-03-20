import styled from 'styled-components/native';

export const Container = styled.View`
  height: 36px;
  padding: 8px;
  border-radius: 2px;
  overflow: hidden;
  background-color: #fff;
  margin-top: 18px;
  margin-left: 12px;
  margin-right: 12px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;

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
