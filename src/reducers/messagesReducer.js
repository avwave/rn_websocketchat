import * as types from '../constants/ActionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
      return state.concat([{
        message: action.message,
        author: action.author,
        id: action.id,
      }]);
    case types.BEGIN_CHAT:
      return [];
    default:
      return state;
  }
};

export default messages;
