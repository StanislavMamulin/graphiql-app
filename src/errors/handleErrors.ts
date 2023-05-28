import { t } from 'i18next';
import { FirebaseError } from 'firebase/app';
import { AddNotification } from '../hooks/useAddNotifications';
import { getFBErrorMessage } from './errorsMessages';
import { SlideNotificationType } from '../types/NotificationType';

export const handleError = (error: unknown, sender: AddNotification) => {
  if (error instanceof FirebaseError) {
    sender({
      message: getFBErrorMessage(error.code),
      type: SlideNotificationType.ERROR,
    });
  } else if (error instanceof Error) {
    sender({ message: error.message, type: SlideNotificationType.ERROR });
  } else {
    sender({
      message: `${t('apiError.somethingWrong')}\nError: ${error}`,
      type: SlideNotificationType.ERROR,
    });
  }
};
