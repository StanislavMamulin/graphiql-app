import classNames from 'classnames';
import { FiX, FiAlertCircle, FiCheck, FiTrash2 } from 'react-icons/fi';
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

const NOTIFICATION_ICON_SIZE = 32;
const CLOSE_ICON_SIZE = 24;

export function SlideNotification({
  closeHandler,
  notification,
}: SlideNotificationProps): JSX.Element {
  const { id, message, type } = notification;

  const getNotificationStyles = () =>
    classNames(styles.notificationWrapper, {
      [styles.notification_error]:
        type === SlideNotificationType.ERROR || type === SlideNotificationType.SERVICE,
      [styles.notification_success]: type === SlideNotificationType.SUCCESS,
    });

  const getIcon = () => {
    if (type === SlideNotificationType.ERROR) {
      return <FiAlertCircle size={NOTIFICATION_ICON_SIZE} color={IconsColor.ERROR} />;
    } else if (type === SlideNotificationType.SUCCESS) {
      return <FiCheck size={NOTIFICATION_ICON_SIZE} color={IconsColor.SUCCESS} />;
    } else {
      return <FiTrash2 size={NOTIFICATION_ICON_SIZE} color={IconsColor.CLOSE} />;
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className={styles.notification__typeicon}>{getIcon()}</div>
      <span className={styles.notification__text}>{message}</span>
      <button onClick={() => closeHandler(id)} className={styles.notification__button}>
        <FiX size={CLOSE_ICON_SIZE} color={IconsColor.CLOSE} />
      </button>
    </div>
  );
}
