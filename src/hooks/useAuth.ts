import { useAppSelector } from './reduxHooks';

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);

  return {
    isAuth: !!token,
    email,
    token,
    id,
  };
};
