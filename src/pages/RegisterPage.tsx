import { FC } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../components/LanguageSwitcher/LangSwitcher';

import styles from './Register.module.css';

const RegisterPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.lang_btn}>
        <LangSwitcher />
      </div>
      <SignUpForm />
      <div className={styles.nav_home}>
        <NavLink to="/">{t('toHome')}</NavLink>
      </div>
    </div>
  );
};

export default RegisterPage;
