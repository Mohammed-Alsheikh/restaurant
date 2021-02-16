import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';

import MenuScreen from '../views/screens/Menu';
import MealScreen from '../views/screens/Meal';

import {ROUTES} from '../constants';

export default createStackNavigator(
  {
    [ROUTES.Menu]: {
      screen: MenuScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    [ROUTES.Meal]: {
      screen: MealScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: ROUTES.Menu,
  },
);
