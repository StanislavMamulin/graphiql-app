import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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
import { handleError } from '../../errors/handleErrors';

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

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const { email, password }: FieldValues = getValues();
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

      handleError(error, sendNotifications);
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
          <h2>{t('auth.signin')}</h2>
          <div className={styles.form_group.concat(' ', errors.email ? styles.hasError : '')}>
            <FormInput
              type="text"
              placeholder="email"
              name="email"
              autoComplete="email"
              register={register}
              errors={errors.email?.message?.toString()}
              rules={{
                required: t('auth.fieldRequired') || c.en.MESSAGES.errors.required,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('auth.emailFormat') || c.en.MESSAGES.errors.emailFormat,
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
              errors={errors.password?.message?.toString()}
              rules={{
                required: t('auth.fieldRequired') || c.en.MESSAGES.errors.required,
                minLength: {
                  value: 8,
                  message: t('auth.minLength') || c.en.MESSAGES.errors.minLength,
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
