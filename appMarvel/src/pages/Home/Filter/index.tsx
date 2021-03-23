import React, { useState, useRef, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { useComic } from '../../../hooks/comic';
import { ICharacter } from '../../../models/character';

import Title from '../../../components/Title';
import Modal from './Modal';

import {
  Container,
  Content,
  Row,
  Text,
  TextFilter,
  ButtonClear,
  TextClear,
  Button,
  HeaderModal,
} from './styles';
import InputSearch from '../../../components/InputSearch';

const Filter: React.FC = () => {
  const [char, setChar] = useState<string | null>(null);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [charactersFiltered, setCharactersFiltered] = useState<ICharacter[]>(
    [],
  );

  const {
    characterFilter,
    setCharacterFilter,
    search,
    setLoading,
  } = useComic();
  const refModalize = useRef<Modalize>(null);

  const handleFilterLetter = () => {
    refModalize.current?.open();
  };

  const handleFilterCharacter = (text: string) => {
    if (text) {
      const newCharacters = characters.filter(
        item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      setCharactersFiltered(newCharacters);
      return;
    }

    setCharactersFiltered(characters);
  };

  const handleClear = async () => {
    setLoading(true);
    setCharacterFilter(null);
    await search({ limit: 1 });
    setLoading(false);
  };

  useEffect(() => {
    setCharactersFiltered(characters);
  }, [characters]);

  return (
    <>
      <Container>
        <Content>
          <Row>
            {characterFilter && (
              <>
                <Text>Filter: </Text>
                <TextFilter>{characterFilter.name}</TextFilter>
              </>
            )}
          </Row>

          <Row>
            {characterFilter && (
              <ButtonClear testID="filter_button_clear" onPress={handleClear}>
                <TextClear>Clear</TextClear>
              </ButtonClear>
            )}
            <Button
              onPress={handleFilterLetter}
              style={{ transform: [{ rotate: '-90deg' }] }}>
              <IoniconsIcon name="options" color="#fff" size={24} />
            </Button>
          </Row>
        </Content>
      </Container>

      <Modalize
        ref={refModalize}
        modalTopOffset={52}
        onClosed={() => setChar(null)}
        modalStyle={{ backgroundColor: '#323232' }}
        HeaderComponent={() => (
          <HeaderModal>
            {!char ? (
              <Title>Character's initial</Title>
            ) : (
              <InputSearch
                placeholder="Character's name"
                onChangeText={handleFilterCharacter}
              />
            )}
          </HeaderModal>
        )}>
        <Modal
          refModalize={refModalize}
          char={char}
          setChar={setChar}
          characters={charactersFiltered}
          setCharacters={setCharacters}
        />
      </Modalize>
    </>
  );
};

export default Filter;
