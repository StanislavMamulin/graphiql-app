import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';

interface validateFields {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<validateFields> = (email, password) => {
    console.log(email);
    console.log(password);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
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
        <a href="">Register</a>
      </div>
    </form>
  );
};

export default LoginForm;
