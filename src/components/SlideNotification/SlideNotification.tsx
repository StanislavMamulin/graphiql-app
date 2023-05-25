import classNames from 'classnames';
import { FiX, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { SlideNotificationItem, SlideNotificationType } from '../../types/NotificationType';

import styles from './SlideNotification.module.css';

type SlideNotificationProps = {
  closeHandler: (id: string) => void;
  notification: SlideNotificationItem;
};

enum IconsColor {
  ERROR = 'red',
  SUCCESS = 'green',
  CLOSE = 'black',
}

const NOTIFICATION_ICON_SIZE = 40;
const CLOSE_ICON_SIZE = 24;

export function SlideNotification({
  closeHandler,
  notification,
}: SlideNotificationProps): JSX.Element {
  const { id, message, type } = notification;

  const getNotificationStyles = () =>
    classNames(styles.notificationWrapper, {
      [styles.notification_error]: type === SlideNotificationType.ERROR,
      [styles.notification_success]: type === SlideNotificationType.SUCCESS,
    });

  return (
    <div className={getNotificationStyles()}>
      <div className={styles.notification__typeicon}>
        {type === SlideNotificationType.ERROR ? (
          <FiAlertCircle size={NOTIFICATION_ICON_SIZE} color={IconsColor.ERROR} />
        ) : (
          <FiCheck size={NOTIFICATION_ICON_SIZE} color={IconsColor.SUCCESS} />
        )}
      </div>
      <span className={styles.notification__text}>{message}</span>
      <button onClick={() => closeHandler(id)} className={styles.notification__button}>
        <FiX size={CLOSE_ICON_SIZE} color={IconsColor.CLOSE} />
      </button>
    </div>
  );
}
