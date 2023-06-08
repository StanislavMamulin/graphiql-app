import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useSignout } from '../hooks/useSignout';
import { t } from 'i18next';
import { SlideNotificationType } from '../types/NotificationType';
import { useAddNotification } from '../hooks/useAddNotifications';

export const CheckExpToken = () => {
  const { isAuth, isTokenExp } = useAuth();
  const signoutUser = useSignout();
  const sendNotification = useAddNotification();

  if (isAuth && isTokenExp) {
    signoutUser();
    sendNotification({
      message: t('auth.tokenExpired'),
      type: SlideNotificationType.ERROR,
    });

    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
