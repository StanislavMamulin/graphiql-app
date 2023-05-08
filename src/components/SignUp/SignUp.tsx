import { FC, SyntheticEvent } from 'react';
import Form from '../form/Form';

const SignUp: FC = () => {
  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return <Form title="Register" handleSubmit={handleRegister} />;
};

export default SignUp;
