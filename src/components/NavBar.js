import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { UnSeenMessageContext } from '../GlobalState';

var NavBar = ({ setPageView }) => {
  const [unseenMessages, unseenMessageDispatch] = useContext(
    UnSeenMessageContext
  );

  const {
    textStyle,
    NavBarRow,
    inboxNumber,
    inboxNumberText,
    touchZones
  } = styles;

  return (
    <View style={NavBarRow}>
      <TouchableOpacity
        onPress={e => setPageView('Profile')}
        style={touchZones}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={e => setPageView('Home')} style={touchZones}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={e => setPageView('Messages')}
        style={touchZones}
      >
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
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
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
    backgroundColor: 'black',
    width: 18,
    height: 18,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 65,
    bottom: 20
  },
  inboxNumberText: {
    fontSize: 12,
    color: 'white'
  },

  touchZones: {
    paddingTop: 30,
    height: 60
  }
};

export default NavBar;
