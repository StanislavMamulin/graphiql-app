import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import styles from './FormInput.module.css';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type FormFieldsType = 'email' | 'password' | 'cPassword';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues>;
  name: FormFieldsType;
  placeholder: string;
  rules?: RegisterOptions;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const FormInput: FC<InputProps> = ({ register, name, placeholder, rules, errors, ...rest }) => {
  const [show, setShow] = useState(true);

  const inputRef = useRef(null);
  const { type } = rest;

  const { ref, ...restRegister } = register && register(name, rules);
  const handleViewPassword = () => {
    inputRef.current.attributes.type.value === 'password'
      ? (inputRef.current.attributes.type.value = 'text')
      : (inputRef.current.attributes.type.value = 'password');
    setShow(!show);
  };

  return (
    <>
      <div className={styles.inputBox.concat(' ', errors ? styles.hasError : '')}>
        <input
          {...restRegister}
          placeholder={placeholder}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <span>{placeholder}</span>
        {type === 'password' && (
          <input type="checkbox" onChange={handleViewPassword} title="Show password" />
        )}
      </div>

      <span role="alert" className={styles.error}>
        {errors}
      </span>
    </>
  );
};

export default FormInput;
