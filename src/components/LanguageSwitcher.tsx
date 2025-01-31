import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center sm:text-sm md:text-lg">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="outline-none"
      >
        <option className="flex items-center text-[10px] md:text-lg" value="en">English</option>
        <option className="flex items-center text-[10px] md:text-lg" value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;