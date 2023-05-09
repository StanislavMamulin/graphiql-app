import { LangSwitcher } from '../components/LanguageSwitcher/LangSwitcher';
import { Button } from '../components/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.css';
// import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

export const WelcomePage = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const { isAuth } = useAuth();

  return (
    <>
      <div
        style={{
          backgroundColor: '#202020',
          backgroundImage: 'url(https://graphql.org/img/graph-wash.png)',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '80%',
          width: '100%',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className={styles.user_btns}>
          <LangSwitcher />
          {!isAuth ? (
            <div className={styles.user_btns_auth}>
              <Button title="Sign in" clickHandler={() => console.log('clicked')} />
              <Button title="Sign up" clickHandler={() => console.log('clicked')} />
            </div>
          ) : (
            <Button title="Sign in" clickHandler={() => console.log('clicked')} />
          )}
        </div>
        <div className="welcome_content">
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
