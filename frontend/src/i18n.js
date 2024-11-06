// src/i18n.js
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
    lng: localStorage.getItem('i18nextLng') || 'en', // Язык по умолчанию
    fallbackLng: 'en', // Резервный язык
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false // Для защиты от XSS
    }
  });

export default i18n;
