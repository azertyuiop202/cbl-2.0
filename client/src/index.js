import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import App from './App';
import cardsReducer from './store/cards/reducer';
import collectionReducer from './store/collection/reducer';
import portalReducer from './store/portal/reducer';
import triviaAnswersReducer from './store/triviaAnswers/reducer';
import usersReducer from './store/users/reducer';

import './index.css';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  portal: portalReducer,
  cards: cardsReducer,
  collection: collectionReducer,
  triviaAnswers: triviaAnswersReducer,
  users: usersReducer
});

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
