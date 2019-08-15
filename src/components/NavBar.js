import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { UnSeenMessageContext } from '../GlobalState';

var NavBar = ({ setPageView }) => {
  const [unseenMessages, unseenMessageDispatch] = useContext(
    UnSeenMessageContext
  );

  const { textStyle, NavBarRow, inboxNumber, inboxNumberText } = styles;

  return (
    <View style={NavBarRow}>
      <TouchableOpacity onPress={e => setPageView('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={e => setPageView('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={e => setPageView('Messages')}>
        <Text>Messages</Text>
        {unseenMessages > 0 ? (
          <View style={inboxNumber}>
            <Text style={inboxNumberText}>{unseenMessages}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#373737'
  },

  NavBarRow: {
    backgroundColor: '#00ffef',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    paddingTop: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  inboxNumber: {
    backgroundColor: 'blue',
    width: 18,
    height: 18,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 65,
    bottom: 10
  },
  inboxNumberText: {
    fontSize: 12,
    color: 'white'
  }
};

export default NavBar;
