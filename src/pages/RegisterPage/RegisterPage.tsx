import { FC } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { TbHomeMove } from 'react-icons/tb';

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
        <NavLink to="/">
          <TbHomeMove size={32} className={styles.nav_ico} />
          {t('toHome')}
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterPage;
