import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import NavBar from './NavBar';
import HomePage from './homePage/HomePage';
import MessagePage from './messagePage/MessagePage';
import ProfilePage from './profilePage/ProfilePage';

const Main = () => {
  const [pageView, setPageView] = useState('Home');

  useEffect(() => {}, []);

  function renderPageView() {
    switch (pageView) {
      case 'Home':
        return <HomePage />;
      case 'Messages':
        return <MessagePage />;
      case 'Profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  }

  return (
    <View style={(styles.appBody, styles.fullScreen)}>
      <NavBar setPageView={setPageView} />
      {renderPageView()}
    </View>
  );
};

const styles = {
  appBody: {
    backgroundColor: '#fff'
  },
  fullScreen: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default Main;
