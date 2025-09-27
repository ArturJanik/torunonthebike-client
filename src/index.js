import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { makeServer } from './server';

import App from './App';
import './fonts.css';
import './index.css';

if (process.env.NODE_ENV === 'development') {
    if (typeof makeServer === 'function') {
      makeServer();
    }
}

const app = (
  <BrowserRouter history={ history }>
    <App />
  </BrowserRouter>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app);
