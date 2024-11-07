import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en/translation.json') },
      ru: { translation: require('./locales/ru/translation.json') },
      hy: { translation: require('./locales/hy/translation.json') },
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
