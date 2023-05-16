import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header/Header';
// import { useTranslation } from 'react-i18next';
import Documentation from '../components/Editor/Documentation';
import Request from '../components/Editor/Request';
import Response from '../components/Editor/Response';
import Variables from '../components/Editor/Variables';
import Headers from '../components/Editor/Headers';
import { Suspense } from 'react';
import styles from '../components/Editor/Editor.module.css';

const MainPage = () => {
  // const { t } = useTranslation();
  const { isAuth } = useAuth();

  return !isAuth ? (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.rrBlock}>
          <Request />
          <Response />
        </div>
        <div>
          <Variables />
          <Headers />
        </div>
      </div>
      <div className={styles.interface}>
        <Suspense fallback={<div>Loading...</div>}>
          <Documentation />
        </Suspense>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainPage;
