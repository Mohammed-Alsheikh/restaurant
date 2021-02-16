import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../styles';

export default ({white}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        animating={true}
        color={white ? 'white' : Colors.primary}
        size="large"
      />
    </View>
  );
};
