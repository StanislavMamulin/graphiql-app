import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const CheckExpToken = () => {
  const { isAuth, isTokenExp } = useAuth();

  if (isAuth && isTokenExp) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
