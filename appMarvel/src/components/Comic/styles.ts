import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  height: 140px;
  flex-direction: row;

  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 16px;
`;

export const Portatil = styled.View`
  position: relative;
  flex: 1;
  max-width: 90px;
  margin-right: 12px;
  border-radius: 6px;
  overflow: hidden;
`;

export const Thumbnail = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: 'RobotoCondensed-Bold';
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
  margin-right: 12px;
  color: #f4f4f4;
`;

export const ContentWriter = styled.View`
  flex: 1;
`;

export const Writer = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: #caa96d;
  margin-top: 6px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const TitleDate = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Bold';
  font-size: 15px;
  color: #f4f4f4;
  margin-right: 4px;
`;

export const Date = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'RobotoCondensed-Regular';
  font-size: 14px;
  color: #f00;
`;
