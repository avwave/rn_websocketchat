import ReconnectingWebSocket from 'reconnecting-websocket'
import * as types from '../constants/ActionTypes';
import {beginChat, messageReceived, populateUsersList} from '../actions';

const setupSocket = (dispatch, token) => {
  const socket = new ReconnectingWebSocket('ws://127.0.0.1:8080/messaging/', token);

  socket.onopen = (event) => {
    console.log("socket open", event);
  };

  socket.onmessage = (event) => {
    console.log("socket message", event);
    const data = JSON.parse(event.data);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        break;
      case types.BEGIN_CHAT:
        dispatch(beginChat(data.name));
        break;
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      default:
        break;
    }
  };

  socket.onerror = (event) => {
    console.log("socket error", event);
  };

  socket.onclose = (event) => {
    console.log("socket close", event);
  };
  return socket;
};

export default setupSocket;
