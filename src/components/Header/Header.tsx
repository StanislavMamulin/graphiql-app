import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { signOutUser } from '../../services/firebase/auth';
import { removeUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

import styles from './Header.module.css';

const STICKY_THRESHOLD_PX = 100;

export function Header() {
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
        Welcome
      </NavLink>
      <LangSwitcher small={sticky} />
      <Button
        title="Sign out"
        clickHandler={async () => {
          await signOutUser();
          dispatch(removeUser());
        }}
      />
    </header>
  );
}
