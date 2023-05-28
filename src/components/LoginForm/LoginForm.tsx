import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';

import * as c from './constants';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import FormInput from '../FormInput/FormInput';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { getTokenInfo, signIn } from '../../services/firebase/auth';
import { useAddNotification } from '../../hooks/useAddNotifications';
import { SlideNotificationType } from '../../types/NotificationType';

interface validateFields {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const sendNotifications = useAddNotification();

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<validateFields> = async () => {
    const { email, password } = getValues();
    setIsSubmitting(true);

    try {
      const user = await signIn(email, password);
      const { expirationTime } = await getTokenInfo(user);

      setIsSubmitting(false);
      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
          token: user.refreshToken,
          expDate: expirationTime,
        })
      );
      history('/main');
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof FirebaseError) {
        sendNotifications({ message: error.message, type: SlideNotificationType.ERROR });
      } else if (error instanceof Error) {
        sendNotifications({ message: error.message, type: SlideNotificationType.ERROR });
      } else {
        sendNotifications({
          message: `${t('apiError.somethingWrong')}\nError: ${error}`,
          type: SlideNotificationType.ERROR,
        });
      }
    }
  };

  return (
    <div
      className={styles.form_wrapper.concat(
        ' ',
        errors.email || errors.password ? styles.hasError : ''
      )}
    >
      {isSubmitting && <Spinner />}
      <ErrorBoundary>
        <form
          className={styles.login_form.concat(' ', errors.form ? styles.hasError : '')}
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            <span role="alert" className={styles.error}>
              {errors.form?.message}
            </span>
          }
          <h2>{t('auth.signin')}</h2>
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
            {t('auth.or')}
            <Link to="/register">{t('auth.signup')}</Link>
          </div>
        </form>
      </ErrorBoundary>
    </div>
  );
};

export default LoginForm;
