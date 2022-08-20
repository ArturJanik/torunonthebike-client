import 'react-app-polyfill/ie11';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import makeServer from './server';

import App from './App';
import { isDev, isProd } from './utilities/isEnv';
import './fonts.css';
import './index.css';

if (isDev() && typeof makeServer === 'function') {
  makeServer();
}

if(isProd()){
  ReactGA.initialize('UA-140808271-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const app = (
  <BrowserRouter history={ history }>
    <App />
  </BrowserRouter>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app);
