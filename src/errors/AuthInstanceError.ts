import { t } from 'i18next';
import { FIREBASE_FALLBACK_ERRORTEXT } from './errorsMessages';

export const AuthInstanceError = () =>
  new Error(t('apiError.firebaseConfig') || FIREBASE_FALLBACK_ERRORTEXT);
