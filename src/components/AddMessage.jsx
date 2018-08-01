import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../actions';

class AddMessage extends Component {
  render() {
    return (
      <section id="new-message">
        <input
          onKeyPress={(e) => {
          if (e.key === 'Enter') {
            this
              .props
              .sendMessage(this.input.value, 'Me');
            this.input.value = '';
          }
        }}
          type="text"
          ref={(node) => {
          this.input = node;
        }}/>
      </section>
    );
  }
}

AddMessage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, author) => {
      dispatch(addMessage(message, author));
    },
  };
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(AddMessage);
