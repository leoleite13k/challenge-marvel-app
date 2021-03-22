import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
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
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
})`
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: 5;
`;
