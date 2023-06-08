import { checkTokenExpDate } from '../utils/checkTokenDate';
import { useAppSelector } from './reduxHooks';

export const useAuth = () => {
  const { email, token, id, expDate } = useAppSelector((state) => state.user);

  return {
    isAuth: !!token,
    email,
    token,
    id,
    expDate,
    isTokenExp: checkTokenExpDate(expDate),
  };
};
