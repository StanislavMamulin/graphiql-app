import { FC, useState } from 'react';
import styles from './form.module.css';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({ title, handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <form className={styles.login_form} onSubmit={() => handleSubmit(email, pass)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button type="submit">{title}</button>
    </form>
  );
};

export default Form;
