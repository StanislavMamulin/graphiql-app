import styles from './Button.module.css';

type ButtonProps = {
  title: string;
  clickHandler: () => void;
  extraClass?: string;
};

export const Button = ({ title, clickHandler, extraClass }: ButtonProps): JSX.Element => (
  <button onClick={clickHandler} className={styles.button + ' ' + extraClass}>
    {title}
  </button>
);
