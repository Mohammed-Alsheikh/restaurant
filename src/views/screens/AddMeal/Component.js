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
import {createMeal, getTypes} from './action';
import {ActivityIndecator} from '../../lib';

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
  const [types, setTypes] = useState([]);
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [desc, setDesc] = useState('');
  const [descAr, setDescAr] = useState('');
  const [type, setType] = useState(0);
  const [time, setTime] = useState('');
  const [enoughFor, setEnoughFor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(ADD);

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
    await createMeal(
      name,
      nameAr,
      desc,
      descAr,
      enoughFor,
      time,
      price,
      image,
      type,
    );
    setloading(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getTypes();
      setTypes(res);
    })();
  }, []);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="New Meal" />
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
              source={image.uri ? {uri: image.uri} : image}
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
          <View style={{alignSelf: 'center'}}>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    alignSelf: 'center',
                    backgroundColor: Colors.primary,
                    paddingVertical: 8,
                    paddingHorizontal: 24,
                  }}
                  onPress={() => setVisible(true)}>
                  <Text style={{color: 'white'}}>
                    {type ? type.get('title') : 'Select your dish type'}
                  </Text>
                </TouchableOpacity>
              }>
              {types.map(e => (
                <React.Fragment>
                  <Menu.Item
                    title={e.get('title')}
                    onPress={() => {
                      setVisible(false);
                      setType(e);
                    }}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </Menu>
          </View>
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
