import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as c from './constants';
import styles from './SignUpForm.module.css';
import { Button } from '../Button/Button';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

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
    <div
      className={styles.form_wrapper.concat(
        ' ',
        errors.email || errors.password || errors.cPassword ? styles.hasError : ''
      )}
    >
      <form
        className={styles.signup_form.concat(' ', errors.form ? styles.hasError : '')}
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          <span role="alert" className={styles.error}>
            {errors.form?.message}
          </span>
        }
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
          <Button title="SignUp" type="submit" />
          or
          <Link to="/login">sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
