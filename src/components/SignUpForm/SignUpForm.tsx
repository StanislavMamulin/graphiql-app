import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './SignUpForm.module.css';
import { Button } from '../Button/Button';
import { NavLink } from 'react-router-dom';

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    const { email, password } = getValues();
    console.log(email);
    console.log(password);
  };

  const passwordValidation = () => {
    const { password } = getValues();
    if (!/[a-zA-Z]/.test(password)) return c.en.MESSAGES.errors.containLetter;
    if (!/\d/.test(password)) return c.en.MESSAGES.errors.containDigit;
    if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password))
      return c.en.MESSAGES.errors.containSpecial;
  };

  const passwordCompare = () => {
    const { password, cPassword } = getValues();
    return cPassword === password || c.en.MESSAGES.errors.noMatchPass;
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit(onSubmit)}>
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
      <div className={styles.form_group.concat(' ', errors.password ? styles.hasError : '')}>
        <input
          id="password"
          {...register('password', {
            required: c.en.MESSAGES.errors.required,
            minLength: {
              value: 8,
              message: c.en.MESSAGES.errors.minLength,
            },
            validate: passwordValidation,
          })}
          type="password"
          placeholder="password"
          autoComplete="current-password"
        />
        {<span role="alert">{errors.password?.message}</span>}
      </div>
      <div className={styles.form_group.concat(' ', errors.cPassword ? styles.hasError : '')}>
        <input
          id="cPassword"
          {...register('cPassword', {
            required: c.en.MESSAGES.errors.required,
            validate: passwordCompare,
          })}
          type="password"
          placeholder="confirm password"
          autoComplete="repeat-password"
        />
        {<span role="alert">{errors.cPassword?.message}</span>}
      </div>
      <div className={styles.form_group}>
        <Button title="SignUp" type="submit" clickHandler={() => {}} />
        or
        <NavLink to="/login">sign in</NavLink>
      </div>
    </form>
  );
};

export default SignUpForm;
