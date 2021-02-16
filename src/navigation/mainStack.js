import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../views/screens/Home';
import OrderDetailsScreen from '../views/screens/OrderDetails';
import DriversScreen from '../views/screens/Drivers';

import {ROUTES} from '../constants';

export default createStackNavigator(
  {
    [ROUTES.Home]: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    [ROUTES.OrderDetails]: {
      screen: OrderDetailsScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    [ROUTES.Drivers]: {
      screen: DriversScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: ROUTES.Home,
  },
);
