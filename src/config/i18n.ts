import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// ייבוא קבצי JSON לכל שפה (תיצור אותם לפי הדוגמה בהמשך)
import he from '../i18n/he.json';


// הבטחת RTL
try {
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
} catch (e) {
  // התעלמות משגיאות (למשל ב-Web)
}

const resources = {
  he: { translation: he },

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he',           // שפת ברירת מחדל
    fallbackLng: 'he',   // fallback
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
