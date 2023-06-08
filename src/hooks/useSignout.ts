import { useTranslation } from 'react-i18next';
import { removeUser } from '../redux/slices/userSlice';
import { useAppDispatch } from './reduxHooks';
import { signOutUser } from '../services/firebase/auth';
import { useAddNotification } from './useAddNotifications';
import { SlideNotificationType } from '../types/NotificationType';

export const useSignout = () => {
  const dispatch = useAppDispatch();
  const sendNotification = useAddNotification();
  const { t } = useTranslation();

  return async () => {
    try {
      await signOutUser();
      dispatch(removeUser());
    } catch (error) {
      sendNotification({ message: t('apiError.signout'), type: SlideNotificationType.ERROR });
    }
  };
};
