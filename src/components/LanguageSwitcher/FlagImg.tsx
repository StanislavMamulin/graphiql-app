import styles from './LangSwitcher.module.css';

type FlagImgProps = {
  src: string;
  alt: string;
};

const FLAG_WIDTH_PX = 50;
const FLAG_HEIGHT_PX = 40;

export const FlagImg = ({ src, alt }: FlagImgProps): JSX.Element => (
  <img
    src={src}
    height={FLAG_HEIGHT_PX}
    width={FLAG_WIDTH_PX}
    alt={alt}
    className={styles.lang__flag}
  />
);
