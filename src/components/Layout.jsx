import axios from 'axios';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';
import AddMessage from './AddMessage';

import { store, sagaMiddleware } from '../App';
import setupSocket from '../sockets';
import { handleBeginChat, handleNewMessage } from '../sagas';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Layout extends Component {
  state = {
    token: sessionStorage.getItem('token'),
    email: '',
    password: '',
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}rest-auth/login/`, {
        email: this.state.email,
        password: this.state.password,
      });

      sessionStorage.setItem('token', response.data.key);
      sessionStorage.setItem('email', response.data.user.email);

      const socket = setupSocket(store.dispatch, this.state.token);
      sagaMiddleware.run(handleNewMessage, { socket, username: this.state.email });
      sagaMiddleware.run(handleBeginChat, { socket });

      this.setState({ token: response.data.key });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.token
          ? (
            <React.Fragment>
              <Sidebar/>
              <section id="main">
                <MessagesList/>
                <AddMessage/>
              </section>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <form onSubmit={this.handleLoginSubmit}>
                <label>email:
                  <input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}/>
                </label>
                <br/>
                <label>password:
                  <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}/>
                </label>
                <input type="submit" value="Submit"/>
              </form>
            </React.Fragment>
          )}

      </React.Fragment>
    );
  }
}

export default Layout;
