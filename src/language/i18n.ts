import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../data/en.json";
import frTranslations from "../data/fr.json";

i18n.use(initReactI18next).init({
    resources: {
        en: enTranslations,
        fr: frTranslations,
    },
    lng: "en",
    fallbackLng: "en", // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export default i18n;