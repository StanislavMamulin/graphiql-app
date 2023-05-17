import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header/Header';
// import { useTranslation } from 'react-i18next';

export const MainPage = () => {
  // const { t } = useTranslation();
  const { isAuth } = useAuth();

  return isAuth ? (
    <>
      <Header />
      <div>Editor</div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainPage;
