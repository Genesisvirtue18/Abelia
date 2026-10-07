import { type Language, useLanguage } from "../i18n";
import { IconGlobe } from "./Icons";

export default function LanguageSelect({ className = "" }: { className?: string }) {
  const { language, setLanguage, languages, copy } = useLanguage();

  return (
    <label className={`language-select ${className}`}>
      <IconGlobe className="h-4 w-4" />
      <span className="sr-only">{copy.shared.language}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.currentTarget.value as Language)}
        aria-label={copy.shared.language}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.native}
          </option>
        ))}
      </select>
    </label>
  );
}