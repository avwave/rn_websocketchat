import { takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username;
    params
      .socket
      .send(JSON.stringify(action));
  });
};

const handleBeginChat = function* handleBeginChat(params) {
  yield takeEvery(types.BEGIN_CHAT, (action) => {
    console.log(params);
    // params   .socket   .send(JSON.stringify(action));
  });
};

export { handleNewMessage, handleBeginChat };
