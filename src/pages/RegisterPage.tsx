import { FC } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { NavLink } from 'react-router-dom';

const RegisterPage: FC = () => {
  return (
    <div>
      <SignUpForm />
      <NavLink to="/">Go back home</NavLink>
    </div>
  );
};

export default RegisterPage;
