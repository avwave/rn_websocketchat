import {combineReducers,} from 'redux';
import messages from './messagesReducer';
import users from './usersReducer';

const chat = combineReducers({
  messages,
  users,
});

export default chat;
