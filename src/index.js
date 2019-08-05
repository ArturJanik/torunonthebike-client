import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './fonts.css';
import './index.css';

import App from './App';

import history from './utilities/history';

const app = (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
