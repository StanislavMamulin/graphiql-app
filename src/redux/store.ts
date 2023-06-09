import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice';
import requestReducer from './slices/requestParametersSlice';
import notificationsReducer from './slices/notificationsSlice';
import { rickAndMortyApi } from '../services/rickAndMortyAPI';
import { tokenExpirationMiddleware } from './middlewares/tokenExpirationMiddleware';

const persistConfig = {
  key: 'graphql',
  storage,
  version: 1,
  whitelist: ['user', 'requestParameters'],
  blacklist: ['notifications', rickAndMortyApi.reducerPath],
};

const rootReducer = combineReducers({
  user: userReducer,
  requestParameters: requestReducer,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([rickAndMortyApi.middleware, tokenExpirationMiddleware]),
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
