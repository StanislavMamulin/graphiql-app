import { FC } from 'react';
import styles from './RunButton.module.css';

interface Props {
  onClick: () => void;
}

const RunButton: FC<Props> = ({ onClick, ...rest }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.btn} onClick={handleClick} {...rest}>
      <div className={styles.run}></div>
    </div>
  );
};

export default RunButton;
