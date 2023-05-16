import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './Header.module.css';
import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const STICKY_THRESHOLD_PX = 100;

export function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sticky, setSticky] = useState(false);

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
      <NavLink className="" to="/">
        {t('welcome')}
      </NavLink>
      <LangSwitcher small={sticky} />
      <Button title={t('auth.signout')} clickHandler={() => navigate('/')} />
    </header>
  );
}
