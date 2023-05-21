import { FC } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { NavLink } from 'react-router-dom';

const LoginPage: FC = () => {
  return (
    <div>
      <LoginForm />
      <NavLink to="/">Go back home</NavLink>
    </div>
  );
};

export default LoginPage;
