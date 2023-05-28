import { Middleware } from '@reduxjs/toolkit';
import { t } from 'i18next';

import { checkTokenExpDate } from '../../utils/checkTokenDate';
import { setHeaders, setVariables } from '../slices/requestParametersSlice';
import { rickAndMortyApi } from '../../services/rickAndMortyAPI';
import { signOutUser } from '../../services/firebase/auth';
import { removeUser } from '../slices/userSlice';
import { addNotification } from '../slices/notificationsSlice';
import { SlideNotificationType } from '../../types/NotificationType';

export const tokenExpirationMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (
      action.type !== setVariables.type &&
      action.type !== setHeaders.type &&
      !rickAndMortyApi.endpoints.sendRequest.matchPending(action)
    ) {
      return next(action);
    }

    const { token, expDate } = getState().user;

    if (token && expDate && checkTokenExpDate(expDate)) {
      signOutUser();
      dispatch(removeUser());
      dispatch(
        addNotification({
          message: t('auth.tokenExpired'),
          type: SlideNotificationType.ERROR,
        })
      );
    }

    return next(action);
  };
