import React, { useState, useEffect, useReducer } from 'react';
import io from 'socket.io-client';
import keys from '../config/keys';
import API from './api';
import Constants from './constants';
import _ from 'lodash';

export const UserContext = React.createContext({});
export const SocketContext = React.createContext();
export const MessagesContext = React.createContext([]);
export const ChatroomsContext = React.createContext([]);
export const CurrentChatroomContext = React.createContext('');
export const UnSeenMessageContext = React.createContext(0);

const GlobalState = props => {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(false);
  const [currentChatroom, currentChatroomDispatch] = useReducer(
    currentChatroomReducer,
    ''
  );
  const [unseenMessages, unseenMessageDispatch] = useReducer(unseenReducer, 0);
  const [messages, messageDispatch] = useReducer(messageReducer, []);
  const [chatrooms, chatroomDispatch] = useReducer(chatroomReducer, {});

  useEffect(() => {
    initState();
    initSocket();
  }, []);

  useEffect(() => {
    listenForMessages();
  }, [user, socket, currentChatroom]);

  useEffect(() => {
    console.log('this is the currentChatroom', currentChatroom);
  }, [currentChatroom]);

  async function initState() {
    let user = await API.User.getByUsername('dallinmajor');
    console.log('This was hit', user);
    setUser(user);
    chatroomDispatch({ type: Constants.SET, payload: user.chatrooms });
  }

  //********* REDUCERS ***********

  function messageReducer(state, action) {
    switch (action.type) {
      case Constants.SET:
        return action.payload;

      case Constants.ADD:
        return [...action.payload, ...state];

      case Constants.CLEAR:
        return [];

      default:
        return state;
    }
  }

  function chatroomReducer(state, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
      case Constants.SET:
        return _.keyBy(action.payload, '_id');

      case Constants.UNSEEN:
        newState[action.chatroomId].unseen = true;
        return newState;

      case Constants.SEEN:
        newState[action.chatroomId].unseen = false;
        return newState;

      default:
        return state;
    }
  }

  function currentChatroomReducer(state, action) {
    switch (action.type) {
      case Constants.SET:
        return action.payload;

      case Constants.CLEAR:
        return false;

      default:
        state;
    }
  }

  function unseenReducer(state, action) {
    switch (action.type) {
      case Constants.ADD:
        return state + 1;

      case Constants.SUBTRACT:
        if (0 > state - 1) {
          return state;
        }
        return state - 1;

      case Constants.CLEAR:
        return 0;
    }
  }

  // ************ SOCKETS ************

  function initSocket() {
    const socketIO = io(keys.apiURL, {
      transports: ['websocket'],
      jsonp: false
    });

    socketIO.on(Constants.CONNECT, () => {
      console.log('connected');
    });

    socketIO.on(Constants.DISCONNECT, () => {
      console.log('Disconnected');
    });
    setSocket(socketIO);
  }

  function listenForMessages() {
    if (socket && user) {
      socket.removeAllListeners(`${user._id}`);
      socket.on(`${user._id}`, data => {
        handleIncomingMessage(data);
      });
    }
  }

  function handleIncomingMessage(data) {
    console.log('this was hit');
    if (currentChatroom == data.chatroomId) {
      messageDispatch({
        type: Constants.ADD,
        payload: [data.message]
      });
    } else if (chatrooms[data.chatroomsId]) {
      chatroomDispatch({
        type: Constants.UNSEEN,
        chatroomId: data.chatroomId
      });
      unseenMessageDispatch({ type: Constants.ADD });
    } else {
      unseenMessageDispatch({ type: Constants.ADD });
    }
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <CurrentChatroomContext.Provider
        value={[currentChatroom, currentChatroomDispatch]}
      >
        <MessagesContext.Provider value={[messages, messageDispatch]}>
          <ChatroomsContext.Provider value={[chatrooms, chatroomDispatch]}>
            <SocketContext.Provider value={[socket]}>
              <UnSeenMessageContext.Provider
                value={[unseenMessages, unseenMessageDispatch]}
              >
                {props.children}
              </UnSeenMessageContext.Provider>
            </SocketContext.Provider>
          </ChatroomsContext.Provider>
        </MessagesContext.Provider>
      </CurrentChatroomContext.Provider>
    </UserContext.Provider>
  );
};

export default GlobalState;
