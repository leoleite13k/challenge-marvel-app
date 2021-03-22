import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Content,
  Row,
  BackButton,
  Text,
  TextFilter,
  Button,
} from './styles';

const Filter: React.FC = () => {
  const navigation = useNavigation();

  const handleOrderBy = () => {};

  return (
    <Container>
      <Content>
        <Row>
          <BackButton onPress={() => navigation.goBack()}>
            <AntDesignIcon name="arrowleft" size={20} color="#fff" />
          </BackButton>
          <Text>Orde by: </Text>
          <TextFilter>Date</TextFilter>
        </Row>

        <Row>
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
  );
};

export default Filter;
