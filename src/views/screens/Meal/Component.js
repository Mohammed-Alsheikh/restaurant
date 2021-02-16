/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Image, TouchableOpacity, View, ImageBackground} from 'react-native';
import {Container, Content} from 'native-base';
import {
  Appbar,
  Title,
  Paragraph,
  Text,
  Menu,
  Divider,
  Surface,
  TextInput,
} from 'react-native-paper';
import Colors from '../../styles';
import ImagePicker from 'react-native-image-picker';
import {editMeal, deleteMeal} from './actions';
import {ActivityIndecator} from '../../lib';
import reactotron from 'reactotron-react-native';
import _ from 'lodash';

const options = {
  title: 'Select Image',
  storageOptions: {
    path: 'images',
  },
};

const ADD = require('../../../assets/add-photo.png');
const BACK = require('../../../assets/home.jpg');

const E = v => (v === '' ? true : false);

export default ({navigation}) => {
  const item = navigation.getParam('item');

  const [name, setName] = useState(item.get('name'));
  const [nameAr, setNameAr] = useState(item.get('nameAr'));
  const [desc, setDesc] = useState(item.get('description'));
  const [descAr, setDescAr] = useState(item.get('descriptionAr'));
  const [time, setTime] = useState(item.get('prepTime'));
  const [enoughFor, setEnoughFor] = useState(item.get('enoughFor'));
  const [price, setPrice] = useState(item.get('price'));
  const [image, setImage] = useState(item.get('image').url());

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const ShowImagePicker = () =>
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = {uri: response.uri};
        setImage(response);
      }
    });

  const submit = async () => {
    if (
      E(name) ||
      E(nameAr) ||
      E(desc) ||
      E(descAr) ||
      E(enoughFor) ||
      E(time) ||
      E(price)
    ) {
      return;
    }
    setloading(true);
    await editMeal(
      name,
      nameAr,
      desc,
      descAr,
      enoughFor,
      time,
      price,
      image,
      item,
    );
    setloading(false);
    navigation.goBack();
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Meal" />
        <Appbar.Action
          icon="delete"
          onPress={async () => {
            await deleteMeal(item);
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <ImageBackground
        source={BACK}
        resizeMethod="resize"
        resizeMode="cover"
        style={{flex: 1}}>
        <Content style={{margin: 12}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={ShowImagePicker}
            style={{alignSelf: 'center'}}>
            <Image
              source={image.uri ? {uri: image.uri} : {uri: image}}
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                width: 240,
                height: 240,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 12,
              alignSelf: 'stretch',
              borderRadius: 2,
              paddingVertical: 12,
              paddingHorizontal: 32,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            <TextInput
              style={{backgroundColor: 'transparent', marginVertical: 8}}
              label="Meal Name English"
              mode="outlined"
              value={name}
              onChangeText={val => setName(val)}
            />
            <TextInput
              style={{backgroundColor: 'transparent', marginVertical: 8}}
              label="Meal Name Arabic"
              mode="outlined"
              value={nameAr}
              onChangeText={val => setNameAr(val)}
            />
            <TextInput
              style={{backgroundColor: 'transparent', marginVertical: 8}}
              label="Time in minutes"
              keyboardType="number-pad"
              mode="outlined"
              value={time}
              onChangeText={val => setTime(val)}
            />
            <TextInput
              style={{backgroundColor: 'transparent', marginVertical: 8}}
              label="Enough for"
              keyboardType="number-pad"
              mode="outlined"
              value={enoughFor}
              onChangeText={val => setEnoughFor(val)}
            />
            <TextInput
              style={{backgroundColor: 'transparent', marginVertical: 8}}
              label="Price"
              keyboardType="number-pad"
              mode="outlined"
              value={price}
              onChangeText={val => setPrice(val)}
            />
          </View>
          <TextInput
            style={{backgroundColor: 'transparent', marginVertical: 8}}
            label="Description English"
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            value={desc}
            onChangeText={val => setDesc(val)}
          />
          <TextInput
            style={{backgroundColor: 'transparent', marginVertical: 8}}
            label="Description Arabic"
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            value={descAr}
            onChangeText={val => setDescAr(val)}
          />
          <Submit disabled={loading} onPress={submit}>
            {loading ? (
              <ActivityIndecator white />
            ) : (
              <Text style={{fontSize: 18, color: 'white'}}>{'Submit'}</Text>
            )}
          </Submit>
        </Content>
      </ImageBackground>
    </Container>
  );
};

const Submit = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 32px;
  margin-bottom: 32px;
  background-color: ${Colors.primary};
  width: 250;
  border-radius: 200px;
  align-self: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
