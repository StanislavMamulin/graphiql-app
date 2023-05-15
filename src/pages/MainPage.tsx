import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header/Header';
// import { useTranslation } from 'react-i18next';
import Documentation from '../components/Editor/Documentation';
import Request from '../components/Editor/Request';
import Response from '../components/Editor/Response';
import Variables from '../components/Editor/Variables';
import Headers from '../components/Editor/Headers';

const MainPage = () => {
  // const { t } = useTranslation();
  const { isAuth } = useAuth();

  return !isAuth ? (
    <>
      <Header />
      <Request />
      <Response />
      <Variables />
      <Headers />
      <Documentation />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainPage;
