import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import Welcome from './Components/Welcome';
import Signup from './Components/Auth/Signup';

import {BrowserRouter, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './Reducers';
import Feature from './Components/Feature'

const store =createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path='/' component={Welcome} />
        <Route path='/signup' component={Signup} />
        <Route path='/feature' component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
