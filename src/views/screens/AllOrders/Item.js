/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Title, Divider} from 'react-native-paper';
import Colors from '../../styles';
import moment from 'moment/src/moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LOGO = require('../../../assets/logo.png');

export default ({item, onPress}) => {
  const since = moment(item.createdAt).fromNow();

  return (
    <Container activeOpacity={0.6}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          padding: 14,
          alignItems: 'center',
        }}>
        <Image
          source={LOGO}
          resizeMethod="resize"
          resizeMode="cover"
          style={{width: 77, height: 77, marginRight: 14}}
        />
        <View style={{flex: 1}}>
          <Text>{`Client Name: ${item.get('client').get('username')}`}</Text>
          <Text>{since}</Text>
          <Text>{`Order ID: ${item.id}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
          style={{alignSelf: 'center'}}>
          <Icon name="chevron-right" style={{fontSize: 38, color: 'white'}} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const Container = styled.View`
  margin: 6px 16px 6px 16px;
  background-color: rgba(0, 0, 0, 0.1);
`;
