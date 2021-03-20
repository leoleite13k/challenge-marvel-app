import React, { useState, useEffect } from 'react';
import { Linking, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { SharedElement } from 'react-navigation-shared-element';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';
import { IResult } from '../../models/comic';
import Title from '../../components/Title';

import {
  Container,
  Banner,
  BackButton,
  Content,
  ContentInfo,
  Footer,
  Buy,
  ButtonBuy,
  Description,
  Column,
  TextTitle,
  TextAbout,
  TextBuy,
  Text,
  Writer,
} from './styles';
import { removeHTML } from '../../utils/format';

type ParamComic = {
  Comic: {
    comic: IResult;
    isFavorite: boolean;
  };
};

const Comic: React.FC = () => {
  const [data, setData] = useState<IResult | null>(null);
  const [laoding, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamComic, 'Comic'>>();
  const { comic, isFavorite } = route.params;

  function handleBuy() {
    const urls = data?.urls.find(item => item.type === 'purchase');

    if (urls && urls.url) {
      Linking.openURL(urls.url);
    }
  }

  useEffect(() => {
    async function getComic() {
      const { data: response } = await api.get(`/comics/${comic.id}`);
      setLoading(false);
      setData(response.data.results[0]);
    }

    getComic();
  }, [comic.id]);

  return (
    <Container>
      <SharedElement
        id={isFavorite ? `${comic?.id}-favorite` : `${comic?.id}-bg`}
      >
        <Banner
          source={{
            uri: `https://${comic.thumbnail.path.split('http://')[1]}.${
              comic.thumbnail.extension
            }`,
          }}>
          <BackButton onPress={() => navigation.goBack()}>
            <AntDesignIcon name="arrowleft" size={20} color="#fff" />
          </BackButton>
        </Banner>
      </SharedElement>

      <SharedElement id={`${comic?.id}.title`}>
        <Title>{comic?.title}</Title>
      </SharedElement>
      <ContentInfo>
        <View>
          <TextTitle>Published</TextTitle>
          {data?.dates.map(({ type, date }) => (
            <View key={`${data.id}-${type}-${date}`}>
              {type === 'onsaleDate' && (
                <Text color="#f00">
                  {format(new Date(date), 'MMMM dd, yyyy')}
                </Text>
              )}
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TextTitle>Pages</TextTitle>
          <Text>{data?.pageCount}</Text>
        </View>
      </ContentInfo>
      <Content>
        <TextAbout>{removeHTML(data?.description)}</TextAbout>
      </Content>

      <Footer>
        <Buy>
          {data?.prices.map(({ type, price }) => (
            <View key={`${data.id}-${type}-${price}`}>
              {type === 'printPrice' && <TextTitle>{`$${price}`}</TextTitle>}
            </View>
          ))}
          <ButtonBuy
            onPress={handleBuy}
            disabled={!data?.urls.find(url => url.type === 'purchase')}>
            <TextBuy>Buy</TextBuy>
            <AntDesignIcon name="shoppingcart" size={18} color="#fff" />
          </ButtonBuy>
        </Buy>

        <Description>
          <Column>
            <TextTitle>Writers</TextTitle>
            {data?.creators.items.map(({ name, role }) => (
              <View key={`${data.id}-${name}-${role}`}>
                {role === 'writer' && <Writer>{name}</Writer>}
              </View>
            ))}
          </Column>
          <Column>
            <TextTitle>Penciler</TextTitle>
            {data?.creators.items.map(({ name, role }) => (
              <View key={`${data.id}-${name}-${role}`}>
                {role === 'writer' && <Text>{name}</Text>}
              </View>
            ))}
          </Column>
          <Column>
            <TextTitle>Cover Artist</TextTitle>
            {data?.creators.items.map(({ name, role }) => (
              <View key={`${data.id}-${name}-${role}`}>
                {role === 'writer' && <Text>{name}</Text>}
              </View>
            ))}
          </Column>
        </Description>
      </Footer>
    </Container>
  );
};

Comic.sharedElements = route => {
  const { comic, isFavorite } = route.params;

  return [
    {
      id: `${comic.id}-${isFavorite ? 'favorite' : 'bg'}`,
      animation: 'fade',
    },
    {
      id: `${comic.id}-title`,
      animation: 'fade',
    },
  ];
};

export default Comic;
