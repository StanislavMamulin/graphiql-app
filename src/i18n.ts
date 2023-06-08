import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locale/en.json';
import ru from './locale/ru.json';
import { DEFAULT_LANG, LANG_LS_KEY } from './utils/constants';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  // supportedLngs: ['en', 'ru'],
  lng: localStorage.getItem(LANG_LS_KEY) || DEFAULT_LANG,
  fallbackLng: 'en',
  detection: {
    order: ['localStorage'],
    cache: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
