import React, { useRef } from 'react';
import { Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Content, Input, Word } from './styles';

interface ISearch {
  placeholder: string;
  onChangeText(text: string): Promise<void>;
}

const Search: React.FC<ISearch> = ({ placeholder, onChangeText }) => {
  const modalizeRef = useRef<Modalize>(null);

  function handleSearchLetter() {
    modalizeRef.current?.open();
  }

  return (
    <>
      <Container>
        <Content>
          <Input placeholder={placeholder} onChangeText={onChangeText} />

          <Word onPress={handleSearchLetter}>
            <MaterialCommunityIcon
              name="format-letter-matches"
              color="#fff"
              size={24}
            />
          </Word>
        </Content>
      </Container>
      <Modalize ref={modalizeRef}>
        <Text>MODAL</Text>
      </Modalize>
    </>
  );
};

export default Search;
