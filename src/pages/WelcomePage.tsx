import { useTranslation } from 'react-i18next';

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          backgroundColor: '#202020',
          backgroundImage: 'url(https://graphql.org/img/graph-wash.png)',
          position: 'absolute',
          top: '64px',
          right: 0,
          height: '80%',
          width: '100%',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="welcome_content">
          <div>
            <p>{t('welcome')}</p>
          </div>
          <h1>GraphiQL App</h1>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
