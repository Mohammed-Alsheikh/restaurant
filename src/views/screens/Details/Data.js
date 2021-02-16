/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';

export default ({id, date, total}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          marginVertical: 12,
          backgroundColor: 'rgba(0,0,0,0.28)',
          paddingVertical: 12,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Title style={{color: '#fff', fontSize: 18}}>{'Order ID'}</Title>
          <Paragraph style={{color: '#fff'}}>{id}</Paragraph>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#fff',
            borderLeftWidth: 1,
            borderRightWidth: 1,
          }}>
          <Title style={{color: '#fff', fontSize: 18}}>{'Date'}</Title>
          <Paragraph style={{color: '#fff'}}>{date}</Paragraph>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Title style={{color: '#fff', fontSize: 18}}>{'Total'}</Title>
          <Paragraph style={{color: '#fff'}}>{total + ' QT'}</Paragraph>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 14,
    alignSelf: 'stretch',
  },
});
