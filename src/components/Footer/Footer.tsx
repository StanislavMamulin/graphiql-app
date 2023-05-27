import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <h6>{t('footer.about')}</h6>
        <p>{t('footer.p')}</p>
        <h6>{t('footer.created')}</h6>
        <div className={styles.author_info}>
          <a href="https://github.com/StanislavMamulin">
            <img
              className={styles.author_img}
              alt="StanislavMamulin"
              src="https://avatars.githubusercontent.com/u/31639106?v=4"
            />
          </a>
          <a href="https://github.com/KarinaKold">
            <img
              className={styles.author_img}
              alt="KarinaKold"
              src="https://avatars.githubusercontent.com/u/71209378?v=4"
            />
          </a>
          <a href="https://github.com/vzanimonets">
            <img
              className={styles.author_img}
              alt="ViktarZanimonets"
              src="https://avatars.githubusercontent.com/u/47920165?v=4"
            />
          </a>
        </div>
      </div>

      <div className={styles.footer_copyright}>
        <a href="https://rs.school/js/">
          <img
            className={styles.rs_logo}
            src="https://rs.school/images/rs_school_js.svg"
            alt="RSSchool"
          />
        </a>
        <p>Copyright &copy; 2023</p>
      </div>
    </footer>
  );
}
