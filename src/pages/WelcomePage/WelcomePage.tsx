import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { Button } from '../../components/Button/Button';

import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../services/firebase/auth';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeUser } from '../../redux/slices/userSlice';

import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.bg_btns}>
          <div className={styles.user_btns}>
            <LangSwitcher />
            <div className={styles.user_btns_auth}>
              {!isAuth ? (
                <>
                  <Button title={t('auth.signin')} clickHandler={() => navigate('/login')} />
                  <Button title={t('auth.signup')} clickHandler={() => navigate('/register')} />
                </>
              ) : (
                <>
                  <Button title="Go to Main Page" clickHandler={() => navigate('/main')} />
                  <Button
                    title={t('auth.signout')}
                    clickHandler={async () => {
                      await signOutUser();
                      dispatch(removeUser());
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.welcome_content}>
          <div>
            <p>{t('welcome')}</p>
          </div>
          <h1>GraphiQL App</h1>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
