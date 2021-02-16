/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {Appbar, Modal, Portal} from 'react-native-paper';
import Colors from '../../styles';
import {sendMessage, watchChat} from './actions';
import reactotron from 'reactotron-react-native';

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );
};

export default ({
  navigation,
  visible,
  setVisible,
  dilverayRequest,
  chat,
  setChat,
}) => {
  const setBitches = msg => {
    setChat(msg, GiftedChat.append);
  };

  useEffect(() => {
    watchChat(dilverayRequest.id, setBitches);
  }, [dilverayRequest]);

  const onSend = msgs => {
    sendMessage(dilverayRequest.id, msgs[0].text);
  };

  reactotron.log('chat', dilverayRequest);

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.container}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => setVisible(false)} />
          <Appbar.Content title="Chat" />
        </Appbar.Header>
        <GiftedChat
          inverted={true}
          renderBubble={renderBubble}
          messages={chat}
          onSend={msg => onSend(msg)}
          user={{
            _id: 1,
          }}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
