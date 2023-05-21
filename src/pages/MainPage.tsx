import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header/Header';
// import { useTranslation } from 'react-i18next';
import Request from '../components/Editor/Request';
import Response from '../components/Editor/Response';
import Variables from '../components/Editor/Variables';
import Headers from '../components/Editor/Headers';
import { Suspense, useState } from 'react';
import styles from '../components/Editor/Editor.module.css';
import { LazyDoc } from '../components/Editor';
import { Sidebar } from '../components/Editor/Sidebar';

const MainPage = () => {
  // const { t } = useTranslation();
  const { isAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function openDoc() {
    setIsOpen(!isOpen);
  }

  return !isAuth ? (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.editor_container}>
          <Request />
          <Response />
        </div>
        <div>
          <Variables />
          <Headers />
        </div>
      </div>
      <div className={styles.interface}>
        <Sidebar docHandler={() => openDoc()} />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyDoc isOpen={isOpen} />
        </Suspense>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainPage;
