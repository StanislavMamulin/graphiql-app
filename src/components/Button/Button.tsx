import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  clickHandler: () => void;
  extraClass?: string;
}

export const Button = ({ title, clickHandler, extraClass, ...rest }: ButtonProps): JSX.Element => {
  const getButtonClass = () => {
    const addedClass = extraClass ? ` ${extraClass}` : '';
    return styles.button.concat(addedClass);
  };

  return (
    <button onClick={clickHandler} className={getButtonClass()} {...rest}>
      {title}
    </button>
  );
};
