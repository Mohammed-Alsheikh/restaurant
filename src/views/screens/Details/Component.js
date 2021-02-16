import React, {useEffect, useState} from 'react';
import {Content, Container} from 'native-base';
import {ImageBackground, StyleSheet, FlatList, View} from 'react-native';
import {Appbar, Title, Button} from 'react-native-paper';
import Item from './Item';
import reactotron from 'reactotron-react-native';
import Data from './Data';
import moment from 'moment/src/moment';
import Colors from '../../styles';
import {ROUTES} from '../../../constants';
import Info from './Info';

const BACKG = require('../../../assets/home.jpg');

export default ({navigation}) => {
  const Order = navigation.getParam('order');

  const [items, setItems] = useState([]);

  useEffect(() => {
    Order.get('items')
      .query()
      .include('meal')
      .find()
      .then(r => setItems(r));
  }, [Order]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Orders" />
      </Appbar.Header>
      <ImageBackground source={BACKG} style={styles.background}>
        <Content>
          <Data
            id={Order.id}
            date={moment(Order.createdAt).format('D-M-YYYY')}
            total={Order.get('price')}
          />
          <Info Order={Order} />

          <FlatList
            style={{marginVertical: 24}}
            data={items}
            renderItem={({item}) => <Item item={item} />}
          />
        </Content>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
