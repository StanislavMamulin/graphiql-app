import { useAppDispatch } from '../../hooks/reduxHooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { t } from 'i18next';

import { SlideNotification } from './SlideNotification';
import { ID, SlideNotificationItem, SlideNotificationType } from '../../types/NotificationType';
import { clearNotifications, removeNotification } from '../../redux/slices/notificationsSlice';

import styles from './SlideNotification.module.css';

function ClearAll() {
  const dispatch = useAppDispatch();

  const clearAllNotification: SlideNotificationItem = {
    id: 'clearAllNotifications',
    message: t('notification.clearAll'),
    type: SlideNotificationType.SERVICE,
  };

  const clearAllHandler = () => {
    dispatch(clearNotifications());
  };

  return <SlideNotification closeHandler={clearAllHandler} notification={clearAllNotification} />;
}

export function SlideNotifications(): JSX.Element {
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
      {notifications.length > 2 && <ClearAll />}
    </div>
  );
}
