import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './SignUpForm.module.css';
import { Button } from '../Button/Button';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { Spinner } from '../../components/Spinner/Spinner';

const SignUpForm: FC = () => {
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

  const onSubmit: SubmitHandler<FieldValues> = () => {
    const auth = getAuth();
    const { email, password } = getValues();
    setIsSubmitting(true);

    createUserWithEmailAndPassword(auth, email, password)
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
    <div
      className={styles.form_wrapper.concat(
        ' ',
        errors.email || errors.password || errors.cPassword ? styles.hasError : ''
      )}
    >
      {isSubmitting && <Spinner />}
      <form
        className={styles.signup_form.concat(' ', errors.form ? styles.hasError : '')}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          <span role="alert" className={styles.error}>
            {errors.form?.message}
          </span>
        }
        <h2>Sign up</h2>
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
        <div className={styles.form_group.concat(' ', errors.password ? styles.hasError : '')}>
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
              validate: passwordValidation,
            }}
          />
        </div>
        <div className={styles.form_group.concat(' ', errors.cPassword ? styles.hasError : '')}>
          <FormInput
            name="cPassword"
            register={register}
            errors={errors.cPassword?.message}
            rules={{
              required: c.en.MESSAGES.errors.required,
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
          or
          <Link to="/login">{t('auth.signin')}</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
