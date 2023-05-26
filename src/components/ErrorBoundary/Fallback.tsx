import { FiAlertTriangle } from 'react-icons/fi';
import styles from './ErrorBoundary.module.css';
import { t } from 'i18next';

export function Fallback() {
  return (
    <div className={styles.fallback__container}>
      <FiAlertTriangle color="orange" size={48} />
      <span className={styles.fallback__description}>{t('uiError.componentNotLoading')}</span>
    </div>
  );
}
