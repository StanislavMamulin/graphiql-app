import { FC } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';

const RegisterPage: FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <SignUpForm />
      <center>
        Already have an account? <a href="/login">Sign in</a>
      </center>
    </div>
  );
};

export default RegisterPage;
