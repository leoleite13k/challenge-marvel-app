import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { useFavorite } from '../../../hooks/favorite';
import Title from '../../../components/Title';
import { ORDERBY } from '../../../utils/contants';
import Modal from './Modal';

import {
  Container,
  Content,
  Row,
  BackButton,
  Text,
  TextFilter,
  ButtonClear,
  TextClear,
  Button,
  HeaderModal,
} from './styles';

const Filter: React.FC = () => {
  const navigation = useNavigation();
  const refModalize = useRef<Modalize>(null);
  const { data, order, handleClearAll } = useFavorite();

  const handleOrderBy = () => {
    refModalize.current?.open();
  };

  return (
    <>
      <Container>
        <Content>
          <Row>
            <BackButton onPress={() => navigation.goBack()}>
              <AntDesignIcon name="arrowleft" size={20} color="#fff" />
            </BackButton>
            <Text>Orde by: </Text>
            <TextFilter>
              {ORDERBY.find(sort => sort.field === order)?.title}
            </TextFilter>
          </Row>

          <Row>
            {data.length > 0 && (
              <ButtonClear onPress={handleClearAll}>
                <TextClear>Removel all</TextClear>
              </ButtonClear>
            )}
            <Button onPress={handleOrderBy}>
              <IoniconsIcon
                name="options"
                style={{ transform: [{ rotate: '-90deg' }] }}
                color="#fff"
                size={24}
              />
            </Button>
          </Row>
        </Content>
      </Container>

      <Modalize
        ref={refModalize}
        modalTopOffset={52}
        modalStyle={{ backgroundColor: '#323232' }}
        HeaderComponent={() => (
          <HeaderModal>
            <Title>Order by</Title>
          </HeaderModal>
        )}>
        <Modal refModalize={refModalize} />
      </Modalize>
    </>
  );
};

export default Filter;
