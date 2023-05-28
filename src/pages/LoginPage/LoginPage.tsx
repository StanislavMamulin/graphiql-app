import { FC } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { TbHomeMove } from 'react-icons/tb';

import styles from './Login.module.css';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.lang_btn}>
        <LangSwitcher />
      </div>
      <LoginForm />
      <div className={styles.nav_home}>
        <NavLink to="/">
          <TbHomeMove size={32} className={styles.nav_ico} />
          {t('toHome')}
        </NavLink>
      </div>
    </div>
  );
};

export default LoginPage;
