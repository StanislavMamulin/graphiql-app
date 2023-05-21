import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const NotForLoggedInUser = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/main" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
