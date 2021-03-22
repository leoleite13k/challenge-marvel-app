import React from 'react';
import { IHandles } from 'react-native-modalize/lib/options';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { useFavorite } from '../../../../hooks/favorite';
import { ORDERBY } from '../../../../utils/contants';

import { Container, Button, Text } from './styles';

interface IModal {
  refModalize: React.RefObject<IHandles>;
}

const Modal: React.FC<IModal> = ({ refModalize }) => {
  const { handleSort, order } = useFavorite();

  const handleOrder = (sort: string) => {
    handleSort({ sort });
    refModalize.current?.close();
  };

  return (
    <Container>
      {ORDERBY.map(({ id, title, field }) => (
        <Button key={id} onPress={() => handleOrder(field)}>
          <Text>{title}</Text>
          {order === field && (
            <AntDesignIcon name="check" size={20} color="#caa96d" />
          )}
        </Button>
      ))}
    </Container>
  );
};

export default Modal;
