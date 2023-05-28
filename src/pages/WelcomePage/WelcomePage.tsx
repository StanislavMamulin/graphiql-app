import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../components/LanguageSwitcher/LangSwitcher';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { useSignout } from '../../hooks/useSignout';

import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const { t } = useTranslation();
  const signout = useSignout();
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
                  <Button title={t('toMain')} clickHandler={() => navigate('/main')} />
                  <Button
                    title={t('auth.signout')}
                    clickHandler={async () => {
                      await signout();
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
