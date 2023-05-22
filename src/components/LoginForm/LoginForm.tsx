import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';
import { setUser } from '../../redux/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../hooks/reduxHooks';
import FormInput from '../FormInput/FormInput';
import { Spinner } from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

interface validateFields {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<validateFields> = () => {
    const auth = getAuth();
    const { email, password } = getValues();
    setIsSubmitting(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setIsSubmitting(false);
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            token: user.refreshToken,
          })
        );
        history('/main');
      })
      .catch((e) => {
        setIsSubmitting(false);
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
      {isSubmitting && <Spinner />}
      <form
        className={styles.login_form.concat(' ', errors.form ? styles.hasError : '')}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          <span role="alert" className={styles.error}>
            {errors.form?.message}
          </span>
        }
        <h2>Login</h2>
        <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
          <FormInput
            type="text"
            placeholder="email"
            name="email"
            autoComplete="email"
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
          <FormInput
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
          <Button
            title={t('auth.signin')}
            type="submit"
            clickHandler={() => {
              clearErrors();
            }}
          />
          or
          <Link to="/register">{t('auth.signup')}</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
