import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/index';

import './index.css';
import App from './App';
import './firebase';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-corporate-website">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
