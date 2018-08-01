import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Message from './Message';

const MessagesList = ({ messages }) => {
  return (
    <section id="messages-list">
      <ul>
        {messages.map((message) => {
          return (<Message key={message.id} {...message}/>);
        })}
      </ul>
    </section>
  );
};

MessagesList.PropTypes = {
  messages: PropTypes
    .arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, message: PropTypes.string.isRequired, author: PropTypes.string.isRequired }).isRequired)
    .isRequired,
};

export default connect((state) => {
  return { messages: state.messages };
}, {})(MessagesList);
