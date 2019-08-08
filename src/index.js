import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './fonts.css';
import './index.css';

import App from './App';

import history from './utilities/history';

import ReactGA from 'react-ga';
if(process.env.NODE_ENV === 'production'){
  ReactGA.initialize('UA-140808271-1');
  
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

const app = (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
