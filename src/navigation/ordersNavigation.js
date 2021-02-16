import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';

import AllOrdersScreen from '../views/screens/AllOrders';
import DetailsScreen from '../views/screens/Details';

import {ROUTES} from '../constants';

export default createStackNavigator(
  {
    [ROUTES.AllOrders]: {
      screen: AllOrdersScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    [ROUTES.Details]: {
      screen: DetailsScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: ROUTES.AllOrders,
  },
);
