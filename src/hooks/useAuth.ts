import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { email, token, id, name } = useSelector((state) => state.user);
  return {
    isAuth: !!token,
    email,
    token,
    id,
    name,
  };
};
