import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sq from './locales/sq';
import en from './locales/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sq: { translation: sq },
      en: { translation: en }
    },
    lng: 'sq', // Default language is Albanian
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
