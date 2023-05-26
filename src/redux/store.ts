import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import userReducer from './slices/userSlice';
import requestReducer from './slices/requestParametersSlice';
import notificationsReducer from './slices/notificationsSlice';
import { rickAndMortyApi } from '../services/rickAndMortyAPI';

const rootReducer = combineReducers({
  user: userReducer,
  requestParameters: requestReducer,
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
