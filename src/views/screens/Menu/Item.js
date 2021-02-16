import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import Colors from '../../styles';
import reactotron from 'reactotron-react-native';
import {setStatus} from './actions';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({item, goToDetails}) => {
  const [available, setAvailable] = useState(item.get('available'));
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
        source={{uri: item.get('image').url()}}
        resizeMethod="resize"
        resizeMode="cover"
        style={{width: 80, height: 80, margin: 12, borderRadius: 4}}
      />
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{width: '90%'}}>
          <Title numberOfLines={1} style={{color: '#fff'}}>
            {item.get('name')}
          </Title>
          <Title style={{color: Colors.primary}}>
            {item.get('price') + ' QT'}
          </Title>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Paragraph style={{color: 'white'}}>{'Available: '}</Paragraph>
            <Checkbox
              status={available ? 'checked' : 'unchecked'}
              onPress={() => {
                setAvailable(!available);
                setStatus(item, !available);
              }}
              color={Colors.primary}
            />
            <Paragraph style={{color: 'white', marginLeft: 6}}>
              {'Ordered: ' + item.get('timesOrdered') + ' Times'}
            </Paragraph>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={goToDetails}
        style={{justifyContent: 'center', marginRight: 8}}>
        <Icon name="chevron-right" style={{fontSize: 32, color: 'white'}} />
      </TouchableOpacity>
    </View>
  );
};
