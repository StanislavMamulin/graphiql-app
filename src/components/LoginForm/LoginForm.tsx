import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';
import { setUser } from '../../redux/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface validateFields {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<validateFields> = () => {
    const auth = getAuth();
    const { email, password } = getValues();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            token: user.refreshToken,
          })
        );
        history('/');
      })
      .catch((e) => {
        setError('form', { type: 'form', message: e.message });
      });
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
      {<span role="alert">{errors.form?.message}</span>}
      <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
        <input
          {...register('email', {
            required: c.en.MESSAGES.errors.required,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: c.en.MESSAGES.errors.emailFormat,
            },
          })}
          type="email"
          placeholder="email"
          autoComplete="username"
        />
        {<span role="alert">{errors.email?.message}</span>}
      </div>
      <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
        <input
          id="password"
          {...register('password', {
            required: c.en.MESSAGES.errors.required,
            minLength: {
              value: 8,
              message: c.en.MESSAGES.errors.minLength,
            },
          })}
          type="password"
          placeholder="password"
          autoComplete="current-password"
        />
        {<span role="alert">{errors.password?.message}</span>}
      </div>
      <div className={styles.form_group}>
        <Button title="Login" type="submit" />
        or
        <Link to="/register">sign up</Link>
      </div>
    </form>
  );
};

export default LoginForm;
