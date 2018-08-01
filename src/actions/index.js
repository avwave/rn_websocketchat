import * as types from '../constants/ActionTypes';

let nextMessageId = 0;
let nextUserId = 0;

export const addMessage = (message, author) => {
  return {
    type: types.ADD_MESSAGE,
    id: nextMessageId++,
    message,
    author,
  };
};
export const beginChat = (userid) => {
  return {
    type: types.BEGIN_CHAT,
    id: nextUserId++,
    userid,
  };
};

export const messageReceived = (message, author) => {
  return {
    type: types.MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    author,
  };
};

export const populateUsersList = (users) => {
  return {
    type: types.USERS_LIST,
    users,
  };
};
