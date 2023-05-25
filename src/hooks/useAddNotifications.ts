import { addNotification } from '../redux/slices/notificationsSlice';
import { SlideNotificationType } from '../types/NotificationType';
import { useAppDispatch } from './reduxHooks';

type AddNotificationProps = {
  message: string;
  type: SlideNotificationType;
};

type AddNotification = (props: AddNotificationProps) => void;

export const useAddNotification = (): AddNotification => {
  const dispatch = useAppDispatch();

  return ({ message, type }) => {
    dispatch(addNotification({ message, type }));
  };
};
