import React, { useState } from 'react';
import { IHandles } from 'react-native-modalize/lib/options';

import { useComic } from '../../../../hooks/comic';

import { Container, Button, Thumbnail, Text } from './styles';
import { ICharacter } from '../../../../models/character';
import { LETTERS } from '../../../../utils/contants';
import Loader from '../../../../components/Loader';

interface IModal {
  refModalize: React.RefObject<IHandles>;
  char: string | null;
  setChar: React.Dispatch<React.SetStateAction<string | null>>;
  characters: ICharacter[];
  setCharacters: React.Dispatch<React.SetStateAction<ICharacter[]>>;
}

const Modal: React.FC<IModal> = ({
  refModalize,
  char,
  setChar,
  characters,
  setCharacters,
}) => {
  const [loadingCharacter, setLoadingCharacter] = useState<boolean>(false);

  const { searchByChar, search, setCharacterFilter, setLoading } = useComic();

  const handleSelectChar = async (letter: string) => {
    setChar(letter);
    setLoadingCharacter(true);
    const dataCharacters = await searchByChar({ char: letter });
    setCharacters(dataCharacters);
    setLoadingCharacter(false);
  };

  const handleSelectCharacter = async (character: ICharacter) => {
    refModalize.current?.close();

    setLoading(true);
    setCharacterFilter(character);
    await search({ limit: 1, character });
    setLoading(false);
  };

  return (
    <Container>
      {!char ? (
        <>
          {LETTERS.map(letter => (
            <Button key={letter} onPress={() => handleSelectChar(letter)}>
              <Text>{letter}</Text>
            </Button>
          ))}
        </>
      ) : (
        <>
          {loadingCharacter ? (
            <Loader marginTop="50%" />
          ) : (
            <>
              {characters.map(character => (
                <Button
                  key={character.id}
                  onPress={() => handleSelectCharacter(character)}
                >
                  <Thumbnail
                    source={{
                      uri: `https://${
                        character.thumbnail.path.split('http://')[1]
                      }.${character.thumbnail.extension}`,
                    }}
                  />
                  <Text>{character.name}</Text>
                </Button>
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Modal;
