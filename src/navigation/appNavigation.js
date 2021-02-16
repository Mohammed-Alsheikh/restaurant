import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';
import Drawer from './CustomDrawer';
import MainStack from './mainStack';
import NewMealScreen from '../views/screens/AddMeal';
import OrdersStack from './ordersNavigation';
import MenuStack from './menuStack';

import {ROUTES} from '../constants';
import Colors from '../views/styles';

export default createDrawerNavigator(
  {
    [ROUTES.MainStack]: {
      screen: MainStack,
      navigationOptions: () => {
        return {
          drawerIcon: () => (
            <Icon name="home" style={{fontSize: 28, color: Colors.primary}} />
          ),
          drawerLabel: () => <Text style={styles.detailsText}>{'Home'}</Text>,
        };
      },
    },
    [ROUTES.MenuStack]: {
      screen: MenuStack,
      navigationOptions: () => {
        return {
          drawerIcon: () => (
            <Icon
              name="assignment"
              style={{fontSize: 28, color: Colors.primary}}
            />
          ),
          drawerLabel: () => <Text style={styles.detailsText}>{'Menu'}</Text>,
        };
      },
    },
    [ROUTES.NewMeal]: {
      screen: NewMealScreen,
      navigationOptions: () => {
        return {
          drawerIcon: () => (
            <Icon name="create" style={{fontSize: 28, color: Colors.primary}} />
          ),
          drawerLabel: () => (
            <Text style={styles.detailsText}>{'New Meal'}</Text>
          ),
        };
      },
    },
    [ROUTES.OrdersStack]: {
      screen: OrdersStack,
      navigationOptions: () => {
        return {
          drawerIcon: () => (
            <Icon name="list" style={{fontSize: 28, color: Colors.primary}} />
          ),
          drawerLabel: () => (
            <Text style={styles.detailsText}>{'All Orders'}</Text>
          ),
        };
      },
    },
  },
  {
    initialRouteName: ROUTES.MenuStack,
    order: [
      ROUTES.MainStack,
      ROUTES.MenuStack,
      ROUTES.OrdersStack,
      ROUTES.NewMeal,
    ],
    contentComponent: props => <Drawer {...props} />,
  },
);

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    margin: 18,
  },
  detailsText: {
    fontSize: 16,
    margin: 10,
  },
  logOutImage: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: 255,
  },
  logOutText: {
    fontSize: 22,
    top: 270,
    color: '#c70d3a',
  },
});
