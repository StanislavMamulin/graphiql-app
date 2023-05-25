import { useAppDispatch } from '../../hooks/reduxHooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './SlideNotification.module.css';
import { SlideNotification } from './SlideNotification';
import { ID } from '../../types/NotificationType';
import { removeNotification } from '../../redux/slices/notificationsSlice';

export function SlideNotifications() {
  const { notifications } = useSelector((state: RootState) => state.notifications);
  const dispatch = useAppDispatch();

  const removeNotificationHandler = (id: ID) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className={styles.notificationsWrapper}>
      {notifications.map((notification) => {
        return (
          <SlideNotification
            key={notification.id}
            closeHandler={removeNotificationHandler}
            notification={notification}
          />
        );
      })}
    </div>
  );
}
