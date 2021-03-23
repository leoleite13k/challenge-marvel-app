/* eslint-disable global-require */
import React from 'react';
import Lottie from 'lottie-react-native';

import { Container, Wrapper } from './styles';

export interface ILoader {
  marginTop?: string;
}

const Loader: React.FC<ILoader> = ({ marginTop }) => {
  return (
    <Container testID="loader" marginTop={marginTop}>
      <Wrapper>
        <Lottie
          source={require('../../../assets/lotties/loader.json')}
          autoPlay
          loop
        />
      </Wrapper>
    </Container>
  );
};

export default Loader;
