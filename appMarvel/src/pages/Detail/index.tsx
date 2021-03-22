import React, { useEffect } from 'react';
import { Linking, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { useDetail } from '../../hooks/detail';
import { IResult } from '../../models/comic';
import { formatDate, removeHTML } from '../../utils/format';
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import FavoriteButton from '../../components/FavoriteButton';

import {
  Container,
  Banner,
  Row,
  BackButton,
  ContentFavorite,
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

type ParamDetail = {
  Detail: {
    comic: IResult;
    isFavorite: boolean;
  };
};

const Detail: React.FC = () => {
  const { data, loading, searchById, setData } = useDetail();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamDetail, 'Detail'>>();
  const { comic, isFavorite } = route.params;

  const handleBuy = () => {
    const urls = data?.urls.find(item => item.type === 'purchase');

    if (urls && urls.url) {
      Linking.openURL(urls.url);
    }
  };

  useEffect(() => {
    searchById({ id: comic.id });
  }, [comic.id, searchById]);

  useEffect(() => {
    return () => setData(null);
  }, [setData]);

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

          <ContentFavorite>
            <FavoriteButton data={comic} />
          </ContentFavorite>
        </Banner>
      </SharedElement>

      <Row>
        <SharedElement id={`${comic?.id}.title`}>
          <Title>{comic?.title}</Title>
        </SharedElement>
      </Row>

      <ContentInfo>
        <View>
          <TextTitle>Published</TextTitle>
          {data?.dates.map(({ type, date }) => (
            <View key={`${data.id}-${type}-${date}`}>
              {date && type === 'onsaleDate' && (
                <Text color="#f00">{formatDate(date)}</Text>
              )}
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TextTitle>Pages</TextTitle>
          <Text>{data?.pageCount}</Text>
        </View>
      </ContentInfo>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Content>
            <TextAbout>{removeHTML(data?.description)}</TextAbout>
          </Content>

          <Footer>
            <Buy>
              {data?.prices.map(({ type, price }) => (
                <View key={`${data.id}-${type}-${price}`}>
                  {type === 'printPrice' && (
                    <TextTitle>{`$${price}`}</TextTitle>
                  )}
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
                    {role === 'penciller' && <Text>{name}</Text>}
                  </View>
                ))}
              </Column>
              <Column>
                <TextTitle>Cover Artist</TextTitle>
                {data?.creators.items.map(({ name, role }) => (
                  <View key={`${data.id}-${name}-${role}`}>
                    {role === 'artist' && <Text>{name}</Text>}
                  </View>
                ))}
              </Column>
            </Description>
          </Footer>
        </>
      )}
    </Container>
  );
};

export default Detail;
