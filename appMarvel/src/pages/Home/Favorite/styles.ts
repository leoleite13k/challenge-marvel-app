import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  position: relative;
  height: 100%;
  width: 100px;
  margin-right: 18px;
`;

export const RemoveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
})`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
`;

export const Thumbnail = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;
