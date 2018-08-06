import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Chance from 'chance';

import './App.css';

import Layout from './components/Layout';

import reducers from './reducers';
import { beginChat } from './actions';
import setupSocket from './sockets';
import { handleBeginChat, handleNewMessage } from './sagas';

const chance = new Chance();
const username = chance.first();

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

const token = sessionStorage.getItem('token');
const email = sessionStorage.getItem('email');

if (token && email) {
  setupSocket(store.dispatch, token).then((socket) => {
    sagaMiddleware.run(handleNewMessage, { socket, username: email });
    sagaMiddleware.run(handleBeginChat, { socket });
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <Provider store={store}>
        <div id="container">
          <Layout/>
        </div>
      </Provider>
    );
  }
}

export default App;
