/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {Appbar} from 'react-native-paper';
import {data} from './mock';
import {ROUTES} from '../../../constants';
import Colors from '../../styles';
import Item from './Item';
import {fetchOrders} from './actions';
import reactotron from 'reactotron-react-native';
import {Parse} from 'parse/react-native';
import PushNotification from 'react-native-push-notification';

const BACK = require('../../../assets/home.jpg');

export default ({navigation}) => {
  const [items, setItems] = useState([]);

  const notify = () => {
    PushNotification.localNotification({
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      vibrate: true, // (optional) default: true
      vibration: 500, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'private', // (optional) set notification visibility, default: private
      importance: 'high', // (optional) set notification importance, default: high
      title: 'New Order!', // (optional)
      message: 'A new order have been sent!', // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  };

  useEffect(() => {
    PushNotification.configure({
      onRegister: function(token) {
        reactotron.log('TOKEN:', token);
      },
      onNotification: function(notification) {},
      senderID: 'YOUR GCM (OR FCM) SENDER ID',

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    fetchOrders().then(res => setItems(res));

    const Order = Parse.Object.extend('Order');
    const query = new Parse.Query(Order);
    query
      .subscribe()
      .then(subscription => {
        reactotron.log(subscription);
        subscription.on('update', async object => {
          reactotron.logImportant('updated', object);
          const res = await fetchOrders();
          setItems(res);
        });
        subscription.on('open', async () => {
          reactotron.logImportant('subscription opened');
        });
        subscription.on('create', async object => {
          const res = await fetchOrders();
          setItems(res);
          reactotron.logImportant('create', object);
          notify();
        });
      })
      .catch(e => {});

    return () => {
      Parse.LiveQuery.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <Appbar.Content title="Pending Orders" />
      </Appbar.Header>
      <ImageBackground
        source={BACK}
        resizeMethod="resize"
        resizeMode="cover"
        style={{flex: 1}}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <Item
              item={item}
              onPress={() => navigation.navigate(ROUTES.OrderDetails, {item})}
            />
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});