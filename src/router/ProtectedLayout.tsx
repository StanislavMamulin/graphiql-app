import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header/Header';

export const ProtectedLayout = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
