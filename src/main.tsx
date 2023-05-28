import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App.tsx';
import i18n from './i18n';
import { persistor, store } from './redux/store.ts';
import './services/firebase/firebase.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
