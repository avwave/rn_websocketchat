import * as types from '../constants/ActionTypes';
import {
  beginChat,
  messageReceived,
  populateUsersList,
} from '../actions';
import Sockette from 'sockette';

const setupSocket = (dispatch, token) => {
  const socket = new Sockette(process.env.REACT_APP_WEBSOCKET_URL, {
    protocols: token,
    onopen: (e) => {
      console.log("socket open", e);
    },
    onmessage: (event) => {
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
    },
    onreconnect: (e) => {
      console.log('Reconnecting...', e);
    },
    onmaximum: (e) => {
      console.log('Stop Attempting!', e);
    },
    onclose: (e) => {
      console.log('Closed!', e);
    },
    onerror: (e) => {
      console.log('Error:', e);
    },
  });

  return socket;
};

export default setupSocket;
