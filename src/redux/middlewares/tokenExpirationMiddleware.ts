import { Middleware } from '@reduxjs/toolkit';
import { t } from 'i18next';

import { checkTokenExpDate } from '../../utils/checkTokenDate';
import { setHeaders, setVariables } from '../slices/requestParametersSlice';
import { rickAndMortyApi } from '../../services/rickAndMortyAPI';
import { addNotification } from '../slices/notificationsSlice';
import { SlideNotificationType } from '../../types/NotificationType';
import { useSignout } from '../../hooks/useSignout';

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
    const signout = useSignout();

    if (token && expDate && checkTokenExpDate(expDate)) {
      signout();
      dispatch(
        addNotification({
          message: t('auth.tokenExpired'),
          type: SlideNotificationType.ERROR,
        })
      );
    }

    return next(action);
  };
