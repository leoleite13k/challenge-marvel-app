import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export interface ILoader {
  marginTop?: string;
}

const Loader: React.FC<ILoader> = ({ marginTop }) => {
  return (
    <Container marginTop={marginTop}>
      <ActivityIndicator size="large" color="#ccc" />
    </Container>
  );
};

export default Loader;
