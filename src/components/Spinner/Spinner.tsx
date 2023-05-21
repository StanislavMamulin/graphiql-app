import styles from './Spinner.module.css';
import SpinnerImg from '../../assets/icons/spinner.png';

type SpinnerProps = {
  fullscreen?: boolean;
};

const getClassName = (fullscreen: boolean) => {
  const addedClass = fullscreen ? ` ${styles.spinner__container_fullscreen}` : '';
  return styles.spinner__container.concat(addedClass);
};

export function Spinner({ fullscreen = false }: SpinnerProps) {
  return (
    <div className={getClassName(fullscreen)}>
      <img className={styles.spinner__img} src={SpinnerImg} alt="Loading" />
    </div>
  );
}
