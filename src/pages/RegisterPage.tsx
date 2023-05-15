import { FC } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { NavLink } from 'react-router-dom';

const RegisterPage: FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <SignUpForm />
      <NavLink to="/">Go back home</NavLink>
    </div>
  );
};

export default RegisterPage;
