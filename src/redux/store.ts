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
  whitelist: ['user', 'requestParameters'],
  blacklist: ['notifications'],
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
    getDefaultMiddleware().concat([rickAndMortyApi.middleware, tokenExpirationMiddleware]),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
