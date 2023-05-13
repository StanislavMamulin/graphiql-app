import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';
import { setUser } from '../../redux/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Input from '../Input/Input';

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
    <div
      className={styles.form_wrapper.concat(
        ' ',
        errors.email || errors.password ? styles.hasError : ''
      )}
    >
      <form
        className={styles.login_form.concat(' ', errors.form ? styles.hasError : '')}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          <span role="alert" className={styles.error}>
            {errors.form?.message}
          </span>
        }
        <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
          <Input
            type="text"
            placeholder="email"
            name="email"
            register={register}
            errors={errors.email?.message}
            rules={{
              required: c.en.MESSAGES.errors.required,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: c.en.MESSAGES.errors.emailFormat,
              },
            }}
          />
        </div>
        <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
          <Input
            name="password"
            placeholder={'Password'}
            register={register}
            type="password"
            autoComplete="current-password"
            errors={errors.password?.message}
            rules={{
              required: c.en.MESSAGES.errors.required,
              minLength: {
                value: 8,
                message: c.en.MESSAGES.errors.minLength,
              },
            }}
          />
        </div>
        <div className={styles.form_group}>
          <Button title="Login" type="submit" />
          or
          <Link to="/register">sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
