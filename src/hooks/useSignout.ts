import { removeUser } from '../redux/slices/userSlice';
import { useAppDispatch } from './reduxHooks';
import { signOutUser } from '../services/firebase/auth';

export const useSignout = () => {
  const dispatch = useAppDispatch();

  return () => {
    signOutUser();
    dispatch(removeUser());
  };
};
