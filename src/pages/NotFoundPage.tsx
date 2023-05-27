import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <main>
        <div>
          <p>404</p>
          <h2>{t('404.mess1')}</h2>
          <p>{t('404.mess2')}</p>
          <div>
            <NavLink to="/">{t('toHome')}</NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
