import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { LangSwitcher } from '../LanguageSwitcher/LangSwitcher';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignout } from '../../hooks/useSignout';

import styles from './Header.module.css';

const STICKY_THRESHOLD_PX = 50;

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);
  const signout = useSignout();

  useEffect(() => {
    const isSticky = () => {
      if (window.scrollY >= STICKY_THRESHOLD_PX && !sticky) {
        setSticky(true);
      }

      if (window.scrollY < STICKY_THRESHOLD_PX && sticky) {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, [sticky]);

  const getHeaderClass = () =>
    styles.header__container + (sticky ? ' ' + styles.header__container_sticky : '');

  return (
    <header className={getHeaderClass()}>
      <Button title={t('toHome')} clickHandler={() => navigate('/')} />
      <LangSwitcher small={sticky} />
      <Button
        title={t('auth.signout')}
        clickHandler={() => {
          signout();
        }}
      />
    </header>
  );
}
