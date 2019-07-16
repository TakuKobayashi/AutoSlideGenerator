import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import './index.css';
import App from './container/app'
import * as serviceWorker from './serviceWorker';

import reducer from './reducer';

// 永続化の設定
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  //whitelist: ['todos'] // Stateは`todos`のみStorageに保存する
  // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
}

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
