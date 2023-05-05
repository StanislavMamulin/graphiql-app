import styles from "./Button.module.css";

type ButtonProps = {
  title: string;
  clickHandler: () => void;
};

export const Button = ({ title, clickHandler }: ButtonProps): JSX.Element => (
  <button onClick={clickHandler} className={styles.button}>
    {title}
  </button>
);
