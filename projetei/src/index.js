import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles/global.scss'

import styles from './styles/app.module.scss'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  
  <React.StrictMode>
    <>
    <div className={styles.wrapper}>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);


