import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './SignUpForm.module.css';
import { Button } from '../Button/Button';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { Spinner } from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { handleError } from '../../errors/handleErrors';
import { useAddNotification } from '../../hooks/useAddNotifications';
import { createUser, getTokenInfo } from '../../services/firebase/auth';

const SignUpForm: FC = () => {
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
    const { email, password } = getValues();
    setIsSubmitting(true);

    try {
      const user = await createUser(email, password);
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

  const passwordValidation = () => {
    const { password } = getValues();

    if (
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)
    )
      return t('auth.passValid') || c.en.MESSAGES.errors.passValid;
  };

  const passwordCompare = () => {
    const { password, cPassword } = getValues();
    return cPassword === password || t('auth.noMatchPass') || c.en.MESSAGES.errors.noMatchPass;
  };

  return (
    <div
      className={styles.form_wrapper.concat(
        ' ',
        errors.email || errors.password || errors.cPassword ? styles.hasError : ''
      )}
    >
      {isSubmitting && <Spinner />}
      <ErrorBoundary>
        <form
          className={styles.signup_form.concat(' ', errors.form ? styles.hasError : '')}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>{t('auth.signup')}</h2>
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
          <div className={styles.form_group.concat(' ', errors.password ? styles.hasError : '')}>
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
                validate: passwordValidation,
              }}
            />
          </div>
          <div className={styles.form_group.concat(' ', errors.cPassword ? styles.hasError : '')}>
            <FormInput
              name="cPassword"
              register={register}
              errors={errors.cPassword?.message?.toString()}
              rules={{
                required: t('auth.fieldRequired') || c.en.MESSAGES.errors.required,
                validate: passwordCompare,
              }}
              type="password"
              placeholder="Confirm password"
              autoComplete="repeat-password"
            />
          </div>
          <div className={styles.form_group}>
            <Button
              title={t('auth.signup')}
              type="submit"
              clickHandler={() => {
                clearErrors();
              }}
            />
            {t('auth.or')}
            <Link to="/login">{t('auth.signin')}</Link>
          </div>
        </form>
      </ErrorBoundary>
    </div>
  );
};

export default SignUpForm;
