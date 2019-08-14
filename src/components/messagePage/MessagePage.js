import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MessageListComponent from './MessageListComponent';
import MessageModal from './MessageModal';
import {
  UserContext,
  ChatroomsContext,
  CurrentChatroomContext
} from '../../GlobalState';
import API from '../../api';
import _ from 'lodash';
import constants from '../../constants';

const MessagePage = () => {
  const [user] = useContext(UserContext);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [chatrooms, chatroomDispatch] = useContext(ChatroomsContext);
  const [currentChatroom, currentChatroomDispatch] = useContext(
    CurrentChatroomContext
  );
  const [contactId, setContactId] = useState();

  useEffect(() => {
    getChatrooms();
  }, []);

  async function getChatrooms() {
    const data = await API.Chatrooms.getChatrooms(user._id);
    chatroomDispatch({ type: 'set', payload: data });
  }

  function onChatroomPress(chatroom) {
    currentChatroomDispatch({
      type: constants.SET,
      payload: chatroom._id
    });
    setContactId(chatroom.agent._id);
    setShowMessageModal(true);
    console.log(currentChatroom);
  }

  return (
    <View style={styles.messagePageContainer}>
      {_.map(chatrooms, chatroom => {
        return (
          <TouchableOpacity
            key={chatroom._id}
            onPress={() => onChatroomPress(chatroom)}
          >
            <MessageListComponent chatroom={chatroom} />
          </TouchableOpacity>
        );
      })}
      <MessageModal
        show={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        contactId={contactId}
        currentChatroom={currentChatroom}
        currentChatroomDispatch={currentChatroomDispatch}
      />
    </View>
  );
};

const styles = {
  messagePageContainer: {
    marginTop: 15
  }
};

export default MessagePage;
