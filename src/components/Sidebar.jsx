import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { beginChat } from '../actions';

class Sidebar extends Component {
  state = {}
  selectUser = (userid) => {
    this
      .props
      .dispatchBeginChat(userid);
  }
  render() {
    return (
      <aside id="sidebar" className="sidebar">
        <ul>
          {this
            .props
            .users
            .map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={(e) => {
                  this.selectUser(user.id, e);
                }}>{user.email}</li>
              );
            })}
        </ul>
      </aside>
    );
  }
}

Sidebar.PropTypes = {
  users: PropTypes
    .arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }).isRequired)
    .isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchBeginChat: (userid) => {
      dispatch(beginChat(userid));
    },
  };
};

export default connect((state) => {
  return { users: state.users };
}, mapDispatchToProps)(Sidebar);
