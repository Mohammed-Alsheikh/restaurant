import React, {useState, useEffect} from 'react';
import {
  Appbar,
  Modal,
  Portal,
  TextInput,
  Button,
  Title,
} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';
import styled from 'styled-components';
import Colors from '../../styles';
import reactotron from 'reactotron-react-native';
import {acceptReqeust, doneRequest} from './actions';

export default ({
  visible,
  setVisible,
  obj,
  ClearRequest,
  setAccepted,
  accepted,
  setAcceptedStatus,
  clearChat,
}) => {
  if (!obj) {
    return null;
  }
  const {data} = obj;

  const [price, setPrice] = useState('');

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.container}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Appbar.Header style={{width: '100%'}}>
          <Appbar.BackAction onPress={() => setVisible(false)} />
          <Appbar.Content title="Order Details" />
        </Appbar.Header>
        <ScrollView>
          <Row>
            <Title style={{color: Colors.primary}}>{'50cm X 50cm'}</Title>
            <Title>{data.dim ? 'yes' : 'no'}</Title>
          </Row>
          <Row>
            <Title style={{color: Colors.primary}}>{'Weight < 7KG'}</Title>
            <Title>{data.weight ? 'yes' : 'no'}</Title>
          </Row>
          <Row>
            <Title style={{color: Colors.primary}}>{'Product Name: '}</Title>
            <Title>{data.name}</Title>
          </Row>
          <Row>
            <Title style={{color: Colors.primary}}>{'Address Info: '}</Title>
            <Title>{data.address}</Title>
          </Row>
          <Row>
            <Title style={{color: Colors.primary}}>{'Floor number: '}</Title>
            <Title>{data.floor}</Title>
          </Row>
          <Row>
            <Title style={{color: Colors.primary}}>{'Secondary Phone: '}</Title>
            <Title>{data.phone}</Title>
          </Row>
          <View style={{paddingHorizontal: 24, marginVertical: 12}}>
            <TextInput
              label={'Price'}
              value={price}
              mode="outlined"
              keyboardType="number-pad"
              onChangeText={text => setPrice(text)}
            />
          </View>
          {!accepted && (
            <React.Fragment>
              <Button
                style={{marginVertical: 12}}
                icon="send"
                mode="contained"
                onPress={() => {
                  acceptReqeust(obj, price, setAcceptedStatus);
                  setVisible(false);
                  setAccepted(true);
                }}>
                {'Accept'}
              </Button>
              <Button
                style={{marginVertical: 4}}
                icon="send"
                mode="contained"
                onPress={() => {
                  setVisible(false);
                  ClearRequest();
                  clearChat();
                }}>
                {'Reject'}
              </Button>
            </React.Fragment>
          )}
          {accepted && (
            <Button
              style={{marginVertical: 4}}
              icon="send"
              mode="contained"
              onPress={() => {
                setVisible(false);
                ClearRequest();
                clearChat();
                doneRequest(obj);
              }}>
              {'Mark as done'}
            </Button>
          )}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

const Row = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 24px 24px 24px 24px;
  justify-content: space-between;
`;
