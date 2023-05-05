import { FC } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage: FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <center>
        Or <a href="/register">register</a>
      </center>
    </div>
  );
};

export default LoginPage;
