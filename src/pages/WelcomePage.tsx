import { useTranslation } from 'react-i18next';

export const WelcomePage = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <>
      <div>
        <button onClick={() => handleChangeLang('ru')}>ru</button>
        <button onClick={() => handleChangeLang('en')}>en</button>
        <h2>{t('welcome')}</h2>
        <h1>GraphiQL App</h1>
      </div>
    </>
  );
};

export default WelcomePage;
