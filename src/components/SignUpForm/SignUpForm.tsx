import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './SignUpForm.module.css';
import { Button } from '../Button/Button';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm: FC = () => {
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

  const onSubmit: SubmitHandler<FieldValues> = () => {
    const auth = getAuth();
    const { email, password } = getValues();

    createUserWithEmailAndPassword(auth, email, password)
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
        <Button title="SignUp" type="submit" />
        or
        <Link to="/login">sign in</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
