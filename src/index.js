import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import makeServer from './server';

import App from './App';
import history from './utilities/history';
import './fonts.css';
import './index.css';

if (
  process.env.NODE_ENV === 'development' &&
  typeof makeServer === 'function'
) {
  makeServer();
}

if(process.env.NODE_ENV === 'production'){
  ReactGA.initialize('UA-140808271-1');
  
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

const app = (
  <Router history={ history }>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
