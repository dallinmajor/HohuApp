import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

const MessageListComponent = ({ chatroom }) => {
  const {
    messageCompoentStyle,
    imageStyles,
    contactName,
    contactNameBold
  } = styles;

  return (
    <View style={messageCompoentStyle}>
      <Image style={imageStyles} source={{ uri: chatroom.agent.avatar }} />
      <Text style={chatroom.unseenUser ? contactNameBold : contactName}>
        {chatroom.agent.name}
      </Text>
    </View>
  );
};

const styles = {
  messageCompoentStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imageStyles: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  },
  contactName: {
    fontSize: 18,
    paddingLeft: 10
  },
  contactNameBold: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
};

export default MessageListComponent;
