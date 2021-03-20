import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Input, Word } from './styles';

const Search: React.FC = () => {
  return (
    <Container>
      <Input />

      <Word>
        <MaterialCommunityIcon
          name="format-letter-matches"
          color="#fff"
          size={24}
        />
      </Word>
    </Container>
  );
};

export default Search;
