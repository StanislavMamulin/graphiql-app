import { FC } from 'react';
import Login from '../components/Login/Login';

const LoginPage: FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <Login />
      <center>
        Or <a href="/register">register</a>
      </center>
    </div>
  );
};

export default LoginPage;
