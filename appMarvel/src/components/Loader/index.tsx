import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#ccc" />
    </Container>
  );
};

export default Loader;
