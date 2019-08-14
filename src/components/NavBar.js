import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
var NavBar = ({ setPageView }) => {
  const { textStyle, NavBarRow } = styles;

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
  }
};

export default NavBar;
