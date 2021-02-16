/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Appbar,
  Text,
  Menu,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import {Container, Content} from 'native-base';
import {View, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ROUTES} from '../../../constants';
import {fetchOrders} from './actions';
import Colors from '../../styles';
import Item from './Item';

const BACK = require('../../../assets/home.jpg');

const TYPES = ['done', 'kitchen', 'delivery', 'pending'];

export default ({navigation}) => {
  const [type, setType] = useState(TYPES[0]);
  const [orders, setOrders] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const goToDetails = order => {
    navigation.push(ROUTES.Details, {order});
  };

  useEffect(() => {
    (async () => {
      setOrders(undefined);
      const res = await fetchOrders(type);
      setOrders(res);
    })();
  }, [type]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(ROUTES.Home)} />
        <Appbar.Content title="All Orders" subtitle={type} />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Icon
                name="apps"
                style={{marginRight: 12, fontSize: 23, color: 'white'}}
              />
            </TouchableOpacity>
          }>
          {TYPES.map(e => (
            <React.Fragment>
              <Menu.Item
                title={e}
                onPress={() => {
                  setVisible(false);
                  setType(e);
                }}
              />
              <Divider />
            </React.Fragment>
          ))}
        </Menu>
      </Appbar.Header>
      <ImageBackground
        source={BACK}
        resizeMethod="resize"
        resizeMode="cover"
        style={{flex: 1}}>
        {!orders ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={({item}) => (
              <Item item={item} onPress={e => goToDetails(item, e)} />
            )}
          />
        )}
      </ImageBackground>
    </Container>
  );
};
