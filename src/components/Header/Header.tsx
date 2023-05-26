import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { LangSwitcher } from '../LanguageSwitcher/LangSwitcher';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signOutUser } from '../../services/firebase/auth';
import { removeUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

import styles from './Header.module.css';

const STICKY_THRESHOLD_PX = 100;

export function Header() {
  const { t } = useTranslation();
  const [sticky, setSticky] = useState(false);
  const dispatch = useAppDispatch();

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
      <Button
        title={t('auth.signout')}
        clickHandler={async () => {
          await signOutUser();
          dispatch(removeUser());
        }}
      />
    </header>
  );
}
