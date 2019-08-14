import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Modal, TextInput, Button, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import API from '../../api';
import Constants from '../../constants';
import { SocketContext, UserContext, MessagesContext } from '../../GlobalState';
import constants from '../../constants';

const MessageModal = ({
  show,
  setShowMessageModal,
  contactId,
  currentChatroom,
  currentChatroomDispatch
}) => {
  const [socket] = useContext(SocketContext);
  const [user] = useContext(UserContext);
  const [messages, messageDispatch] = useContext(MessagesContext);

  useEffect(() => {
    getMessages();
  }, [currentChatroom, show]);

  async function getMessages() {
    const data = await API.Messages.getMessages(currentChatroom);
    console.log(data);
    messageDispatch({
      type: Constants.SET,
      payload: data.messages
    });
  }

  function onSendMessage(newMessage) {
    messageDispatch({
      type: Constants.ADD,
      payload: newMessage
    });

    newMessage.forEach(m => {
      socket.emit(Constants.MESSAGE, {
        message: m,
        chatroomId: currentChatroom,
        recieverId: contactId
      });
    });
  }

  function handleOnClose() {
    messageDispatch({ type: Constants.CLEAR });
    currentChatroomDispatch({
      type: constants.CLEAR
    });
    setShowMessageModal(false);
  }

  const { modalContainer, closeModalStyle, modalX } = styles;

  return (
    <Modal animationType="slide" visible={show} transparent={false}>
      <View style={modalContainer}>
        <View style={closeModalStyle}>
          <Text style={modalX} onPress={() => handleOnClose()}>
            X
          </Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={newMessage => onSendMessage(newMessage)}
          user={user}
        />
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingBottom: 60
  },
  closeModalStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30
  },
  modalX: {
    padding: 10,
    paddingRight: 20,
    color: '#777',
    fontSize: 18
  }
};

export default MessageModal;
