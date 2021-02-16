import React from 'react';
import {View, Image} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import Colors from '../../styles';
import reactotron from 'reactotron-react-native';

export default ({item}) => {
  const meal = item.get('meal');
  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 6,
        flexDirection: 'row',
      }}>
      <Image
        source={{uri: meal.get('image').url()}}
        resizeMethod="resize"
        resizeMode="cover"
        style={{width: 80, height: 80, margin: 12, borderRadius: 4}}
      />
      <View>
        <Title numberOfLines={1} style={{color: '#fff'}}>
          {meal.get('name')}
        </Title>
        <Paragraph numberOfLines={1} style={{color: '#fff'}}>
          {'Quantity: ' + item.get('quantity')}
        </Paragraph>
        <Title style={{color: Colors.primary}}>
          {meal.get('price') + ' QT'}
        </Title>
      </View>
    </View>
  );
};
