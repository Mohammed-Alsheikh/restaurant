/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Appbar, Text, ActivityIndicator} from 'react-native-paper';
import {Container, Content} from 'native-base';
import {View, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import {ROUTES} from '../../../constants';
import {fetchMenu} from './actions';
import Colors from '../../styles';
import Item from './Item';

const BACK = require('../../../assets/home.jpg');

export default ({navigation}) => {
  const [menu, setMenu] = useState(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetchMenu();
      setMenu(res);
    })();
  }, [navigation]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(ROUTES.Home)} />
        <Appbar.Content title="Menu" />
        <Appbar.Action
          icon="refresh"
          onPress={async () => {
            setMenu(undefined);
            const res = await fetchMenu();
            setMenu(res);
          }}
        />
      </Appbar.Header>
      <ImageBackground
        source={BACK}
        resizeMethod="resize"
        resizeMode="cover"
        style={{flex: 1}}>
        {!menu ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={menu}
            renderItem={({item}) => (
              <Item
                goToDetails={() => navigation.push(ROUTES.Meal, {item})}
                item={item}
              />
            )}
          />
        )}
      </ImageBackground>
    </Container>
  );
};
