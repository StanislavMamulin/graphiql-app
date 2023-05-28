import { t } from 'i18next';

type AuthFBErrors = {
  [key: string]: () => string;
};

const authErrors: AuthFBErrors = {
  'auth/user-not-found': () => t('auth.userNotFound'),
  'auth/wrong-password': () => t('auth.wrongCredential'),
  'auth/email-already-in-use': () => t('auth.emailAlreadyInUse'),
  'auth/weak-password': () => t('auth.weakPassword'),
  'auth/internal-error': () => t('auth.internalError'),
  'auth/invalid-email': () => t('auth.invalidEmail'),
  'auth/too-many-requests': () => t('auth.tooManyRequests'),
  'auth/user-disabled': () => t('auth.userDisabled'),
  'auth/operation-not-allowed': () => t('auth.operationNotAllowed'),
  'auth/account-exists-with-different-credential': () => t('auth.wrongCredential'),
  'auth/invalid-verification-code': () => t('auth.invalidVerificationCode'),
  'auth/invalid-verification-id': () => t('auth.invalidVerificationId'),
  'auth/invalid-credential': () => t('auth.wrongCredential'),
  'auth/credential-already-in-use': () => t('auth.credentialAlreadyInUse'),
  default: () => t('auth.unknownError'),
};

export const FIREBASE_FALLBACK_ERRORTEXT = 'Authentication server initialization error';

export const getFBErrorMessage = (code: string) => authErrors[code]() || authErrors.default();
